import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutSummaryController } from './workout-summary.controller';
import { WorkoutSummaryService } from './workout-summary.service';

describe('WorkoutSummaryController', () => {
  let controller: WorkoutSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutSummaryController],
      providers: [WorkoutSummaryService],
    }).compile();

    controller = module.get<WorkoutSummaryController>(WorkoutSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
