import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SuuntoApiInfoModule } from '../suunto-api-info/suunto-api-info.module';
import { WorkoutSummaryRawModule } from '../workout-summary-raw/workout-summary-raw.module';

import { WorkoutHandlerService } from './workout-handler.service';

@Module({
  imports: [WorkoutSummaryRawModule, SuuntoApiInfoModule, ConfigModule],
  providers: [WorkoutHandlerService],
  exports: [WorkoutHandlerService],
})
export class WorkoutHandlerModule {}
