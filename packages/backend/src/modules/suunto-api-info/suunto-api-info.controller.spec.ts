import { Test, TestingModule } from '@nestjs/testing';

import { SuuntoApiInfoController } from './suunto-api-info.controller';
import { SuuntoApiInfoService } from './suunto-api-info.service';

describe('SuuntoApiInfoController', () => {
  let controller: SuuntoApiInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuuntoApiInfoController],
      providers: [SuuntoApiInfoService],
    }).compile();

    controller = module.get<SuuntoApiInfoController>(SuuntoApiInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
