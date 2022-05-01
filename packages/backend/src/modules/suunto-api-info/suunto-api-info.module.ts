import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SuuntoApiInfo,
  SuuntoApiInfoSchema,
} from './schemas/suunto-api-info.schema';
import { SuuntoApiInfoController } from './suunto-api-info.controller';
import { SuuntoApiInfoService } from './suunto-api-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuuntoApiInfo.name, schema: SuuntoApiInfoSchema },
    ]),
  ],
  controllers: [SuuntoApiInfoController],
  providers: [SuuntoApiInfoService],
  exports: [SuuntoApiInfoService],
})
export class SuuntoApiInfoModule {}
