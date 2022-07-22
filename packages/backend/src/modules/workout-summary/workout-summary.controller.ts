import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ObjectId } from '../../types/objectId';
import { ValidateEntityId } from '../../utils/validate-entity-id.pipe';
import { LoggedIn } from '../auth/decorators/loggedIn.decorators';
import { UserId } from '../users/users.decorators';

import { WorkoutSummaryDto } from './dto/workout-summary.dto';
import { WorkoutSummaryService } from './workout-summary.service';

@Controller('/api/workout-summary')
@LoggedIn()
@ApiTags('Workout summary')
export class WorkoutSummaryController {
  constructor(private readonly workoutSummaryService: WorkoutSummaryService) {}

  @Get()
  @ApiOkResponse({
    type: [WorkoutSummaryDto],
    description: 'Return summaries from all current user workouts',
  })
  async findAll(@UserId() userId: ObjectId): Promise<WorkoutSummaryDto[]> {
    return this.workoutSummaryService.findAll(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: WorkoutSummaryDto,
    description: 'Return summary from a single workout',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Entity id from workout-summaries collection',
  })
  async findOne(
    @UserId() userId: ObjectId,
    @Param('id', ValidateEntityId) id: ObjectId,
  ): Promise<WorkoutSummaryDto> {
    return this.workoutSummaryService.findOne(id, userId);
  }
}
