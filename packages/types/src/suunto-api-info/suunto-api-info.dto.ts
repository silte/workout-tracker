import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class SuuntoApiInfoDto<ObjectIdType = string> {
  @IsMongoId()
  _id: ObjectIdType;

  @IsMongoId()
  userId: string;

  @IsString()
  apiToken: string;

  @IsBoolean()
  isFetching: boolean;

  @IsString()
  fetchMessage: string[];
}
