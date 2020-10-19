import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useContainer } from 'class-validator';

import { ValidatorsModule } from './validators/validators.module';
import { AllExceptionFilter } from './filter/http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(ValidatorsModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();
