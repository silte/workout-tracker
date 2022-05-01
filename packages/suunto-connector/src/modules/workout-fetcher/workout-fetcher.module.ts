import { Module } from '@nestjs/common';
import { WorkoutFetcherService } from './workout-fetcher.service';

@Module({
  providers: [WorkoutFetcherService]
})
export class WorkoutFetcherModule {}
