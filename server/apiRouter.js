import express from 'express';
import {
  initDatabasePool,
  getPortfolioBundle,
  saveContactMessage,
  recordAnalyticsEvent,
  getDatabaseSchemaFiles
} from './db.js';

let initialized = false;

export function createApiRouter() {
  const router = express.Router();
  router.use(express.json({ limit: '64kb' }));

  router.use(async (_req, _res, next) => {
    if (!initialized) {
      initialized = true;
      await initDatabasePool();
    }
    next();
  });

  // GET /api/portfolio — Full portfolio payload from PostgreSQL / fallback store
  router.get('/portfolio', async (_req, res) => {
    try {
      const data = await getPortfolioBundle();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to load portfolio data', details: err.message });
    }
  });

  // GET /api/projects — Projects list
  router.get('/projects', async (_req, res) => {
    try {
      const data = await getPortfolioBundle();
      res.json({ projects: data.projects, source: data.source });
    } catch (err) {
      res.status(500).json({ error: 'Failed to load projects', details: err.message });
    }
  });

  // GET /api/experiences — Experiences list
  router.get('/experiences', async (_req, res) => {
    try {
      const data = await getPortfolioBundle();
      res.json({ experiences: data.experiences, source: data.source });
    } catch (err) {
      res.status(500).json({ error: 'Failed to load experiences', details: err.message });
    }
  });

  // GET /api/schema — Inspect PostgreSQL DDL schema, seed SQL, and live telemetry
  router.get('/schema', (_req, res) => {
    try {
      const info = getDatabaseSchemaFiles();
      res.json(info);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read schema files', details: err.message });
    }
  });

  // POST /api/contact — Submit contact message into PostgreSQL contact_messages table
  router.post('/contact', async (req, res) => {
    try {
      const { sender_name, sender_email, subject, message } = req.body || {};
      if (!sender_name || !sender_email || !message) {
        return res.status(400).json({
          error: 'Name, email, and message are required.'
        });
      }
      const result = await saveContactMessage({
        sender_name: String(sender_name).trim().slice(0, 120),
        sender_email: String(sender_email).trim().slice(0, 180),
        subject: subject ? String(subject).trim().slice(0, 220) : 'Portfolio Inquiry',
        message: String(message).trim().slice(0, 4000),
        ip_address: req.ip || req.socket?.remoteAddress || null,
        user_agent: req.headers['user-agent'] || null
      });
      await recordAnalyticsEvent({
        event_type: 'contact_submit',
        target: sender_email,
        metadata: { sender_name, subject }
      });
      res.status(201).json({
        success: true,
        ...result
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save contact message', details: err.message });
    }
  });

  // POST /api/analytics — Record interaction events (project README opens, fur preset switches, etc.)
  router.post('/analytics', async (req, res) => {
    try {
      const { event_type, target, metadata } = req.body || {};
      if (!event_type || !target) {
        return res.status(400).json({ error: 'event_type and target are required' });
      }
      const result = await recordAnalyticsEvent({
        event_type: String(event_type).slice(0, 80),
        target: String(target).slice(0, 255),
        metadata: metadata && typeof metadata === 'object' ? metadata : {}
      });
      res.status(201).json({ success: true, ...result });
    } catch (err) {
      res.status(500).json({ error: 'Failed to record analytics event', details: err.message });
    }
  });

  return router;
}

