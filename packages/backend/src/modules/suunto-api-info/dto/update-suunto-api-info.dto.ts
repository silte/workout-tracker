import { OmitType, PartialType } from '@nestjs/swagger';

import { SuuntoApiInfoDto } from './suunto-api-info.dto';

export class UpdateSuuntoApiInfoDto extends PartialType(
  OmitType(SuuntoApiInfoDto, ['_id'] as const),
) {}
