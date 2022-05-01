import { Module } from '@nestjs/common';
import { WorkoutListFetcherService } from './workout-list-fetcher.service';

@Module({
  providers: [WorkoutListFetcherService]
})
export class WorkoutListFetcherModule {}
