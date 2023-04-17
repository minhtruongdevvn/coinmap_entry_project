import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MongoExceptionFilter } from './MongoExceptionFilter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new MongoExceptionFilter(app.get(HttpAdapterHost)));

  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') || 3333;
  await app
    .listen(port)
    .then(() => console.log(`App started at: http://localhost:${port}/`));
}
bootstrap();
