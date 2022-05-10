import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';

import {
  WorkoutSummaryRaw,
  WorkoutSummaryRawSchema,
} from './schemas/workout-summary-raw.schema';
import { WorkoutSummaryRawService } from './workout-summary-raw.service';

describe('WorkoutSummaryService', () => {
  let service: WorkoutSummaryRawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: WorkoutSummaryRaw.name, schema: WorkoutSummaryRawSchema },
        ]),
      ],
      providers: [WorkoutSummaryRawService],
    }).compile();

    service = module.get<WorkoutSummaryRawService>(WorkoutSummaryRawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
