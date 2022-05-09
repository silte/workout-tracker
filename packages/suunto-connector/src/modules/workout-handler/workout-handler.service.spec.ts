import { Test, TestingModule } from '@nestjs/testing';

import { WorkoutHandlerService } from './workout-handler.service';

describe('WorkoutHandlerService', () => {
  let service: WorkoutHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutHandlerService],
    }).compile();

    service = module.get<WorkoutHandlerService>(WorkoutHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
