import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';

import {
  WorkoutSummary,
  WorkoutSummarySchema,
} from './schemas/workout-summary.schema';
import { WorkoutSummaryController } from './workout-summary.controller';
import { WorkoutSummaryService } from './workout-summary.service';

describe('WorkoutSummaryController', () => {
  let controller: WorkoutSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: WorkoutSummary.name, schema: WorkoutSummarySchema },
        ]),
      ],
      controllers: [WorkoutSummaryController],
      providers: [WorkoutSummaryService],
    }).compile();

    controller = module.get<WorkoutSummaryController>(WorkoutSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
