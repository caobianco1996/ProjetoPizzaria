import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import multer from 'multer';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

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
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

app.listen(3333, () => console.log('Servidor online!!!'));
