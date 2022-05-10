import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  WorkoutSummary,
  WorkoutSummarySchema,
} from './schemas/workout-summary.schema';
import { WorkoutSummaryService } from './workout-summary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutSummary.name, schema: WorkoutSummarySchema },
    ]),
  ],
  providers: [WorkoutSummaryService],
  exports: [WorkoutSummaryService],
})
export class WorkoutSummaryModule {}
