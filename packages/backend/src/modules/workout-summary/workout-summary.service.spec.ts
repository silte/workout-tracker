import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutSummaryService } from './workout-summary.service';

describe('WorkoutSummaryService', () => {
  let service: WorkoutSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutSummaryService],
    }).compile();

    service = module.get<WorkoutSummaryService>(WorkoutSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
