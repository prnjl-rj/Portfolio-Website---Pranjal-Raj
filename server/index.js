import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiRouter } from './apiRouter.js';
import { initDatabasePool } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use('/api', createApiRouter());

// Serve static production frontend if built
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).json({
        status: 'Pranjal Raj Portfolio API Server Active',
        endpoints: ['/api/portfolio', '/api/projects', '/api/experiences', '/api/schema', '/api/contact', '/api/analytics']
      });
    }
  });
});

initDatabasePool().then((dbStatus) => {
  app.listen(PORT, () => {
    console.log(`[Portfolio Server] Listening on http://localhost:${PORT}`);
    console.log(`[Database Engine] Mode: ${dbStatus.mode} (Connected: ${dbStatus.connected})`);
  });
});

