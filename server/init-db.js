import { initDatabasePool, getDatabaseSchemaFiles } from './db.js';

async function main() {
  console.log('Initializing Pranjal Raj Portfolio PostgreSQL Database Schema...');
  const status = await initDatabasePool();
  const files = getDatabaseSchemaFiles();
  console.log('Database Status:', status);
  console.log(`Schema SQL loaded (${files.schemaSql.length} bytes), Seed SQL loaded (${files.seedSql.length} bytes).`);
  process.exit(0);
}

main();

