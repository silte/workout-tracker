import { WorkoutHandlerModule } from '@local/suunto-connector';
import { Module } from '@nestjs/common';

import { SuuntoApiInfoModule } from '../suunto-api-info/suunto-api-info.module';

import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

@Module({
  imports: [SuuntoApiInfoModule, WorkoutHandlerModule],
  providers: [WorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
