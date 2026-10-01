import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import busArrivalHandler from './api/bus-arrival.js';
import healthHandler from './api/health.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Mount API endpoints
  app.all('/api/bus-arrival', (req: Request, res: Response) => {
    return busArrivalHandler(req, res);
  });

  app.all('/api/health', (req: Request, res: Response) => {
    return healthHandler(req, res);
  });

  // Also support /main/api routes
  app.all('/main/api/bus-arrival', (req: Request, res: Response) => {
    return busArrivalHandler(req, res);
  });

  app.all('/main/api/health', (req: Request, res: Response) => {
    return healthHandler(req, res);
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
