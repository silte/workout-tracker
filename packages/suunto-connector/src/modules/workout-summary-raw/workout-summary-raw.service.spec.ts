import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutSummaryRawService } from './workout-summary-raw.service';

describe('WorkoutSummaryService', () => {
  let service: WorkoutSummaryRawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutSummaryRawService],
    }).compile();

    service = module.get<WorkoutSummaryRawService>(WorkoutSummaryRawService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
