import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Required by backends
export class UpdateSuuntoApiInfoDto {
  @IsOptional()
  @IsString()
  apiToken?: string;

  @IsOptional()
  @IsBoolean()
  isFetching?: boolean;

  @IsOptional()
  @IsString()
  fetchMessage?: string[];
}
