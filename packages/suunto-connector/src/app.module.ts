import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FetchUserWorkoutsCommand } from './basic-command';
import { configuration } from './config/configuration';
import { SuuntoApiInfoModule } from './modules/suunto-api-info/suunto-api-info.module';
import { WorkoutFetcherModule } from './modules/workout-fetcher/workout-fetcher.module';
import { WorkoutListFetcherModule } from './modules/workout-list-fetcher/workout-list-fetcher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbConnectionString'),
      }),
    }),
    SuuntoApiInfoModule,
    WorkoutListFetcherModule,
    WorkoutFetcherModule,
  ],
  providers: [FetchUserWorkoutsCommand],
})
export class AppModule {}
