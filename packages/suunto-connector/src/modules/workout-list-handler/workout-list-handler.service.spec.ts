import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutListHandlerService } from './workout-list-handler.service';

describe('WorkoutListHandlerService', () => {
  let service: WorkoutListHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutListHandlerService],
    }).compile();

    service = module.get<WorkoutListHandlerService>(WorkoutListHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
