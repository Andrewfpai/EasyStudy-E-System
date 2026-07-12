import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // add <NestExpressApplication>
  const uploadDir = process.env.UPLOAD_DIR || './uploads';
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });

  app.useStaticAssets(join(process.cwd(), uploadDir), { prefix: '/uploads' });

  app.enableCors({
    origin: true, // your frontend origin
    // origin: 'http://localhost:3000', // your frontend origin
    credentials: true, // optional
  });
  await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}
bootstrap();
