import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';

import { AppModule } from './app.module';
import { isNodeEnvInTest } from './config/configuration';
import { startMemoryDb } from './config/memoryDatabaseServer';
import { mockAuthenticationMiddleware } from './config/mockAuthenticationMiddleware';
import { SuuntoApiInfoService } from './modules/suunto-api-info/suunto-api-info.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  if (isNodeEnvInTest()) await startMemoryDb();

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (isNodeEnvInTest()) app.use(mockAuthenticationMiddleware);

  await app.listen(PORT);

  const suuntoApiInfoService = app.get(SuuntoApiInfoService);
  suuntoApiInfoService.abortAllActiveUpdates();
}
bootstrap();
