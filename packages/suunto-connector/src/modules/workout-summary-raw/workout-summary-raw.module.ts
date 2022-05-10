import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  WorkoutSummaryRaw,
  WorkoutSummaryRawSchema,
} from './schemas/workout-summary-raw.schema';
import { WorkoutSummaryRawService } from './workout-summary-raw.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutSummaryRaw.name, schema: WorkoutSummaryRawSchema },
    ]),
  ],
  providers: [WorkoutSummaryRawService],
  exports: [WorkoutSummaryRawService],
})
export class WorkoutSummaryRawModule {}
