import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  SuuntoApiInfo,
  SuuntoApiInfoSchema,
} from './schemas/suunto-api-info.schema';
import { SuuntoApiInfoService } from './suunto-api-info.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuuntoApiInfo.name, schema: SuuntoApiInfoSchema },
    ]),
  ],
  providers: [SuuntoApiInfoService],
  exports: [SuuntoApiInfoService],
})
export class SuuntoApiInfoModule {}
