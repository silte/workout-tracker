import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

import { ObjectId } from '../../../types/objectId';

export class SuuntoApiInfoDto {
  @IsMongoId()
  @ApiProperty()
  _id: ObjectId;

  @IsMongoId()
  @ApiProperty()
  userId: ObjectId;

  @IsString()
  @ApiProperty()
  apiToken: string;

  @IsBoolean()
  @ApiProperty()
  isFetching: boolean;

  @IsString()
  @ApiProperty()
  fetchMessage: string[];
}
