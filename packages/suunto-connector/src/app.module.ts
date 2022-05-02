import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { FetchUserWorkoutsCommand } from './basic-command';
import { configuration } from './config/configuration';
import { SuuntoApiInfoModule } from './modules/suunto-api-info/suunto-api-info.module';
import { WorkoutHandlerModule } from './modules/workout-handler/workout-handler.module';
import { WorkoutListHandlerModule } from './modules/workout-list-handler/workout-list-handler.module';

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
    WorkoutHandlerModule,
    WorkoutListHandlerModule,
  ],
  providers: [FetchUserWorkoutsCommand],
})
export class AppModule {}
