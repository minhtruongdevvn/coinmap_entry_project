import '@/common/extension';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') || 3333;
  await app
    .listen(port)
    .then(() => console.log(`App started at: http://localhost:${port}/`));
}
bootstrap();
