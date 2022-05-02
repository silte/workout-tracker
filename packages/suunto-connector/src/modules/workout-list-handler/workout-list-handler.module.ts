import { Module } from '@nestjs/common';

import { SuuntoApiInfoModule } from '../suunto-api-info/suunto-api-info.module';
import { WorkoutSummaryRawModule } from '../workout-summary-raw/workout-summary-raw.module';
import { WorkoutSummaryModule } from '../workout-summary/workout-summary.module';

import { WorkoutListHandlerService } from './workout-list-handler.service';

@Module({
  imports: [SuuntoApiInfoModule, WorkoutSummaryRawModule, WorkoutSummaryModule],
  providers: [WorkoutListHandlerService],
  exports: [WorkoutListHandlerService],
})
export class WorkoutListHandlerModule {}
