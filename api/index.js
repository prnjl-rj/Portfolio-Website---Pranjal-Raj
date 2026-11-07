import express from 'express';
import cors from 'cors';
import { createApiRouter } from '../server/apiRouter.js';
import { initDatabasePool } from '../server/db.js';

const app = express();
app.use(cors());
app.use('/api', createApiRouter());

let dbInitialized = false;

export default async function handler(req, res) {
  if (!dbInitialized) {
    dbInitialized = true;
    await initDatabasePool().catch(() => null);
  }
  return app(req, res);
}

