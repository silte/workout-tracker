import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { LoggedIn } from '../auth/decorators/loggedIn.decorators';

import { WorkoutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';

@Controller('/api/workout')
@LoggedIn()
@ApiTags('Workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get('/suunto/:workoutId')
  @ApiOkResponse({ type: WorkoutDto })
  @ApiParam({ name: 'workoutId', type: 'string' })
  async getSuuntoWorkout(
    @Param('workoutId') workoutId: string,
  ): Promise<WorkoutDto> {
    return this.workoutService.getSuuntoWorkout(workoutId);
  }
}
