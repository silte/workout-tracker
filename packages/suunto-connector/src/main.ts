import { CommandFactory } from 'nest-commander';

import { AppModule } from './app.module';
import { isNodeEnvInTest } from './config/configuration';
import { startMemoryDb } from './config/memoryDatabaseServer';

async function bootstrap() {
  if (isNodeEnvInTest()) await startMemoryDb();

  await CommandFactory.run(AppModule, {
    errorHandler: (err) => {
      console.error(err);
      process.exit(1);
    },
  });
}

bootstrap();
