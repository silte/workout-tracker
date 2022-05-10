import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';

import {
  WorkoutSummary,
  WorkoutSummarySchema,
} from './schemas/workout-summary.schema';
import { WorkoutSummaryService } from './workout-summary.service';

describe('WorkoutSummaryService', () => {
  let service: WorkoutSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: WorkoutSummary.name, schema: WorkoutSummarySchema },
        ]),
      ],
      providers: [WorkoutSummaryService],
    }).compile();

    service = module.get<WorkoutSummaryService>(WorkoutSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
