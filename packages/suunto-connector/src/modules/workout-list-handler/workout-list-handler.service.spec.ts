import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';
import { SuuntoApiInfoModule } from '../suunto-api-info/suunto-api-info.module';
import { WorkoutSummaryRawModule } from '../workout-summary-raw/workout-summary-raw.module';
import { WorkoutSummaryModule } from '../workout-summary/workout-summary.module';

import { WorkoutListHandlerService } from './workout-list-handler.service';

describe('WorkoutListHandlerService', () => {
  let service: WorkoutListHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        SuuntoApiInfoModule,
        WorkoutSummaryRawModule,
        WorkoutSummaryModule,
        ConfigModule,
      ],
      providers: [WorkoutListHandlerService],
    }).compile();

    service = module.get<WorkoutListHandlerService>(WorkoutListHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
