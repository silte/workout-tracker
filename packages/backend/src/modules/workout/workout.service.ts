import { WorkoutHandlerService } from '@local/suunto-connector';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutService {
  async getSuuntoWorkout(workoutId: string): Promise<any> {
    return WorkoutHandlerService.parseWorkout(workoutId);
  }
}
