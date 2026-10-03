import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import { AppError } from './errors/AppError';
import { router } from './routes';

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.get('/health', (_request, response) => {
  return response.status(200).json({ status: 'ok' });
});

app.use(router);
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return res.status(status).json({ error: 'Não foi possível receber o arquivo enviado.' });
  }
  if (err instanceof Error && err.message.startsWith('Formato de imagem')) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

const configuredPort = Number(process.env.PORT);
const port = Number.isInteger(configuredPort) && configuredPort > 0 ? configuredPort : 3333;

app.listen(port, () => console.log(`Pizzaria API listening on port ${port}`));
