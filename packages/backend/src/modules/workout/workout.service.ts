import { WorkoutHandlerService } from '@local/suunto-connector';
import { Injectable } from '@nestjs/common';

import { WorkoutDto } from './dto/workout.dto';

@Injectable()
export class WorkoutService {
  async getSuuntoWorkout(workoutId: string): Promise<WorkoutDto> {
    return WorkoutHandlerService.parseWorkout(workoutId);
  }
}
