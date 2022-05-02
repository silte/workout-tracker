import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectId } from '../../types/objectId';

import { CreateWorkoutSummaryDto } from './dto/create-workout-summary.dto';
import {
  WorkoutSummary,
  WorkoutSummaryDocument,
} from './schemas/workout-summary.schema';

@Injectable()
export class WorkoutSummaryService {
  constructor(
    @InjectModel(WorkoutSummary.name)
    private userModel: Model<WorkoutSummaryDocument>,
  ) {}

  async createMany(workoutSummaries: CreateWorkoutSummaryDto[]) {
    return this.userModel.insertMany(workoutSummaries);
  }

  async findAll(userId: ObjectId) {
    return this.userModel.find({ userId });
  }

  async findOne(id: ObjectId, userId: ObjectId) {
    const workoutSummary = await this.userModel.findById(id);

    if (!workoutSummary) {
      throw new NotFoundException('Workout summary not found.');
    } else if (!workoutSummary.userId.equals(userId)) {
      throw new UnauthorizedException(
        'Unauthorized to access this Workout summary.',
      );
    }
  }

  async removeAllByUser(userId: ObjectId) {
    return this.userModel.deleteMany({ userId });
  }

  async exportAllByUser(userId: ObjectId) {
    return this.userModel.find({ userId });
  }
}
