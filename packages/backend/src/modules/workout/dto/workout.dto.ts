import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WorkoutDataPointDto } from './data-point.dto';
import { PositionCoordinatesDto } from './position-coordinates.dto';

export class WorkoutDto {
  @ApiProperty()
  workoutKey: string;

  @ApiProperty()
  activityId: number;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  totalAscent: number;

  @ApiProperty()
  totalDescent: number;

  @ApiPropertyOptional()
  totalDistance?: number;

  @ApiProperty()
  totalTime: number;

  @ApiPropertyOptional()
  centerPosition?: PositionCoordinatesDto;

  @ApiPropertyOptional()
  startPosition?: PositionCoordinatesDto;

  @ApiPropertyOptional()
  stopPosition?: PositionCoordinatesDto;

  @ApiPropertyOptional()
  maxSpeed?: number;

  @ApiProperty()
  maxAltitude: number;

  @ApiProperty()
  minAltitude: number;

  @ApiProperty()
  avgCadence: number;

  @ApiProperty()
  maxCadence: number;

  @ApiProperty({ type: [WorkoutDataPointDto] })
  dataPoints: WorkoutDataPointDto[];
}
