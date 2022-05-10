import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';

import {
  SuuntoApiInfo,
  SuuntoApiInfoSchema,
} from './schemas/suunto-api-info.schema';
import { SuuntoApiInfoService } from './suunto-api-info.service';

describe('SuuntoApiInfoService', () => {
  let service: SuuntoApiInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: SuuntoApiInfo.name, schema: SuuntoApiInfoSchema },
        ]),
        ConfigModule,
      ],
      providers: [SuuntoApiInfoService],
    }).compile();

    service = module.get<SuuntoApiInfoService>(SuuntoApiInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
