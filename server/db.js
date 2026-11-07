import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { INITIAL_PORTFOLIO_DATA } from './portfolioData.js';

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory store synchronized with PostgreSQL when available
const memoryStore = {
  ...structuredClone(INITIAL_PORTFOLIO_DATA),
  contactMessages: [],
  analyticsEvents: []
};

let pool = null;
let isPostgresConnected = false;
let lastConnectionError = null;

export async function initDatabasePool() {
  const connectionString =
    process.env.DATABASE_URL ||
    (process.env.PGHOST
      ? `postgresql://${process.env.PGUSER || 'postgres'}:${process.env.PGPASSWORD || ''}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'pranjal_portfolio'}`
      : null);

  if (!connectionString) {
    lastConnectionError = 'DATABASE_URL not set; running with PostgreSQL-compatible JavaScript store.';
    return { connected: false, mode: 'postgres-compatible-memory' };
  }

  try {
    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 3000,
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
    });

    const client = await pool.connect();
    try {
      const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf-8');
      await client.query(schemaSql);

      const { rows } = await client.query('SELECT COUNT(*)::int AS count FROM profile');
      if (rows[0].count === 0) {
        const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed.sql'), 'utf-8');
        await client.query(seedSql);
      }
      isPostgresConnected = true;
      lastConnectionError = null;
    } finally {
      client.release();
    }
    return { connected: true, mode: 'postgresql' };
  } catch (err) {
    isPostgresConnected = false;
    lastConnectionError = err.message;
    return { connected: false, mode: 'postgres-compatible-memory', error: err.message };
  }
}

export async function getPortfolioBundle() {
  if (isPostgresConnected && pool) {
    try {
      const [profileRes, expRes, projRes, skillsRes, eduRes, achRes, msgCountRes, eventCountRes] =
        await Promise.all([
          pool.query('SELECT * FROM profile ORDER BY id ASC LIMIT 1'),
          pool.query('SELECT * FROM experiences ORDER BY display_order ASC, id ASC'),
          pool.query('SELECT * FROM projects ORDER BY display_order ASC, id ASC'),
          pool.query('SELECT * FROM skills ORDER BY category ASC, display_order ASC'),
          pool.query('SELECT * FROM education ORDER BY display_order ASC, id ASC'),
          pool.query('SELECT * FROM achievements ORDER BY kind ASC, display_order ASC'),
          pool.query('SELECT COUNT(*)::int AS count FROM contact_messages'),
          pool.query('SELECT COUNT(*)::int AS count FROM analytics_events')
        ]);

      return {
        source: 'postgresql',
        connected: true,
        profile: profileRes.rows[0] || memoryStore.profile,
        experiences: expRes.rows,
        projects: projRes.rows,
        skills: skillsRes.rows,
        education: eduRes.rows,
        achievements: achRes.rows,
        stats: {
          messagesCount: msgCountRes.rows[0]?.count ?? 0,
          eventsCount: eventCountRes.rows[0]?.count ?? 0
        }
      };
    } catch (err) {
      lastConnectionError = err.message;
    }
  }

  return {
    source: 'postgres-compatible-store',
    connected: isPostgresConnected,
    note: lastConnectionError,
    profile: memoryStore.profile,
    experiences: memoryStore.experiences,
    projects: memoryStore.projects,
    skills: memoryStore.skills,
    education: memoryStore.education,
    achievements: memoryStore.achievements,
    stats: {
      messagesCount: memoryStore.contactMessages.length,
      eventsCount: memoryStore.analyticsEvents.length
    }
  };
}

export async function saveContactMessage({ sender_name, sender_email, subject, message, ip_address, user_agent }) {
  if (isPostgresConnected && pool) {
    const query = `
      INSERT INTO contact_messages (sender_name, sender_email, subject, message, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, sender_name, sender_email, subject, message, status, created_at;
    `;
    const { rows } = await pool.query(query, [
      sender_name,
      sender_email,
      subject || 'Portfolio Inquiry',
      message,
      ip_address || null,
      user_agent || null
    ]);
    return { storedIn: 'postgresql', record: rows[0] };
  }

  const record = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sender_name,
    sender_email,
    subject: subject || 'Portfolio Inquiry',
    message,
    status: 'unread',
    created_at: new Date().toISOString()
  };
  memoryStore.contactMessages.unshift(record);
  return { storedIn: 'postgres-compatible-store', record };
}

export async function recordAnalyticsEvent({ event_type, target, metadata }) {
  if (isPostgresConnected && pool) {
    try {
      const { rows } = await pool.query(
        `INSERT INTO analytics_events (event_type, target, metadata) VALUES ($1, $2, $3) RETURNING id, event_type, target, created_at`,
        [event_type, target, JSON.stringify(metadata || {})]
      );
      return { storedIn: 'postgresql', event: rows[0] };
    } catch {
      // fallback below
    }
  }

  const event = {
    id: memoryStore.analyticsEvents.length + 1,
    event_type,
    target,
    metadata: metadata || {},
    created_at: new Date().toISOString()
  };
  memoryStore.analyticsEvents.push(event);
  return { storedIn: 'postgres-compatible-store', event };
}

export function getDatabaseSchemaFiles() {
  const schemaPath = path.join(__dirname, '../database/schema.sql');
  const seedPath = path.join(__dirname, '../database/seed.sql');
  return {
    schemaSql: fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, 'utf-8') : '',
    seedSql: fs.existsSync(seedPath) ? fs.readFileSync(seedPath, 'utf-8') : '',
    connected: isPostgresConnected,
    recentMessages: memoryStore.contactMessages.slice(0, 10),
    recentEvents: memoryStore.analyticsEvents.slice(-15).reverse()
  };
}

