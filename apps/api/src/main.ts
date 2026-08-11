import './env';


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError : false });
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
