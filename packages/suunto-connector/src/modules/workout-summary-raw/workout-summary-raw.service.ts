import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ObjectId } from '../../types/objectId';

import {
  WorkoutSummaryRaw,
  WorkoutSummaryRawDocument,
} from './schemas/workout-summary-raw.schema';

@Injectable()
export class WorkoutSummaryRawService {
  constructor(
    @InjectModel(WorkoutSummaryRaw.name)
    private workoutSummaryRawModel: Model<WorkoutSummaryRawDocument>,
  ) {}

  async createMany(workoutSummaries: WorkoutSummaryRaw[]) {
    return this.workoutSummaryRawModel.insertMany(workoutSummaries);
  }

  async findAllByUser(userId: ObjectId) {
    return this.workoutSummaryRawModel.find({ userId });
  }

  async findAllKeysByUser(userId: ObjectId) {
    return this.workoutSummaryRawModel
      .find({ userId })
      .select('workoutKey')
      .exec();
  }

  async findOne(id: ObjectId, userId: ObjectId) {
    const workoutSummaryRaw = await this.workoutSummaryRawModel.findById(id);

    if (!workoutSummaryRaw) {
      throw new NotFoundException('Workout summary not found.');
    } else if (!workoutSummaryRaw.userId.equals(userId)) {
      throw new UnauthorizedException(
        'Unauthorized to access this Workout summary.',
      );
    }
  }

  async removeAllByUser(userId: ObjectId) {
    return this.workoutSummaryRawModel.deleteMany({ userId });
  }
}
