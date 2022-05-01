import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutFetcherService } from './workout-fetcher.service';

describe('WorkoutFetcherService', () => {
  let service: WorkoutFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutFetcherService],
    }).compile();

    service = module.get<WorkoutFetcherService>(WorkoutFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
