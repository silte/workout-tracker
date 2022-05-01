import { Test, TestingModule } from '@nestjs/testing';
import { SuuntoApiInfoService } from './suunto-api-info.service';

describe('SuuntoApiInfoService', () => {
  let service: SuuntoApiInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuuntoApiInfoService],
    }).compile();

    service = module.get<SuuntoApiInfoService>(SuuntoApiInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
