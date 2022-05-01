import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutListFetcherService } from './workout-list-fetcher.service';

describe('WorkoutListFetcherService', () => {
  let service: WorkoutListFetcherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutListFetcherService],
    }).compile();

    service = module.get<WorkoutListFetcherService>(WorkoutListFetcherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
