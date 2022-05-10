import { Controller, Get, Param } from '@nestjs/common';

import { ObjectId } from '../../types/objectId';
import { ValidateEntityId } from '../../utils/validate-entity-id.pipe';
import { UserId } from '../users/users.decorators';

import { WorkoutSummaryService } from './workout-summary.service';

@Controller('/api/workout-summary')
export class WorkoutSummaryController {
  constructor(private readonly workoutSummaryService: WorkoutSummaryService) {}

  @Get()
  findAll(@UserId() userId: ObjectId) {
    return this.workoutSummaryService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @UserId() userId: ObjectId,
    @Param('id', ValidateEntityId) id: ObjectId,
  ) {
    return this.workoutSummaryService.findOne(id, userId);
  }
}
