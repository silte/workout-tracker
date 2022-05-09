import { Controller, Get, Param } from '@nestjs/common';

import { WorkoutService } from './workout.service';

@Controller('/api/workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/suunto/:workoutId')
  async getSuuntoWorkout(@Param('workoutId') workoutId: string) {
    return this.workoutService.getSuuntoWorkout(workoutId);
  }
}
