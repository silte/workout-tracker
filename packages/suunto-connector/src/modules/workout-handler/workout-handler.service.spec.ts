import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';
import { SuuntoApiInfoModule } from '../suunto-api-info/suunto-api-info.module';
import { WorkoutSummaryRawModule } from '../workout-summary-raw/workout-summary-raw.module';

import { WorkoutHandlerService } from './workout-handler.service';

describe('WorkoutHandlerService', () => {
  let service: WorkoutHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        SuuntoApiInfoModule,
        WorkoutSummaryRawModule,
        ConfigModule,
      ],
      providers: [WorkoutHandlerService],
    }).compile();

    service = module.get<WorkoutHandlerService>(WorkoutHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
