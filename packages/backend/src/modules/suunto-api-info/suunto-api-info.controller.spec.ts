import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { rootMongooseTestModule } from '../../../test/rootMongooseTest.module';

import {
  SuuntoApiInfo,
  SuuntoApiInfoSchema,
} from './schemas/suunto-api-info.schema';
import { SuuntoApiInfoController } from './suunto-api-info.controller';
import { SuuntoApiInfoService } from './suunto-api-info.service';

describe('SuuntoApiInfoController', () => {
  let controller: SuuntoApiInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: SuuntoApiInfo.name, schema: SuuntoApiInfoSchema },
        ]),
        ConfigModule,
      ],
      controllers: [SuuntoApiInfoController],
      providers: [SuuntoApiInfoService],
    }).compile();

    controller = module.get<SuuntoApiInfoController>(SuuntoApiInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
