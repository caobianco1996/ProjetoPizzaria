import crypto from 'crypto';
import multer from 'multer';
import { extname, resolve } from 'path';

const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default {
  upload(folder: string) {
    return {
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
      fileFilter: (_request: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
        const extension = extname(file.originalname).toLowerCase();
        if (!allowedExtensions.has(extension) || !allowedMimeTypes.has(file.mimetype)) {
          return callback(new Error('Formato de imagem não permitido. Use JPG, PNG ou WEBP.'));
        }
        return callback(null, true);
      },
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (_request, file, callback) => {
          const extension = extname(file.originalname).toLowerCase();
          callback(null, `${crypto.randomBytes(16).toString('hex')}${extension}`);
        }
      })
    };
  }
};
