import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

export function UseMulterInterceptor() {
  return UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(process.cwd(), 'public', 'static'));
        },
        filename: (req, file, cb) => {
          const filename = encodeURI(file.originalname.replace(/[^\w\.]/g, ''));
          cb(
            null,
            `${
              Date.now() + Math.random().toString().substring(2, 6)
            }_${filename}`,
          );
        },
      }),
    }),
  );
}
