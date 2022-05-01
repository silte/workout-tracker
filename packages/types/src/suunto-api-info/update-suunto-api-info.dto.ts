import { IsBoolean, IsString } from 'class-validator';

export class UpdateSuuntoApiInfoDto {
  @IsString()
  apiToken: string;

  @IsBoolean()
  isFetching: boolean;

  @IsString()
  fetchMessage: string[];
}
