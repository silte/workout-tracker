import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutDataPointDto {
  @ApiProperty()
  timestamp: string;

  @ApiPropertyOptional()
  hr?: number;

  @ApiPropertyOptional()
  speed?: number;

  @ApiPropertyOptional()
  distance?: number;

  @ApiPropertyOptional()
  altitude?: number;

  @ApiPropertyOptional()
  cadence?: number;
}
