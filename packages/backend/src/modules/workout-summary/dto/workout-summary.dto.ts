import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

import { ObjectId } from '../../../types/objectId';

import { HrIntensityDto } from './intensity-zone.dto';
import { WorkoutMultisportSummary } from './multisport-summary.dto';

export class WorkoutSummaryDto {
  @IsMongoId()
  @ApiProperty({ type: String })
  _id: ObjectId;

  @IsMongoId()
  @ApiProperty({ type: String })
  userId: ObjectId;

  @ApiProperty()
  activityId: number;

  // workoutId
  @ApiProperty()
  workoutKey: string;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  totalTime: number;

  @ApiProperty()
  totalDistance: number;

  @ApiProperty()
  totalAscent: number;

  @ApiProperty()
  totalDescent: number;

  @ApiProperty()
  maxSpeed: number;

  @ApiProperty()
  hrmax: number;

  @ApiProperty()
  hravg: number;

  @ApiProperty()
  avgSpeed: number;

  @ApiProperty()
  avgCadence: number;

  @ApiProperty()
  feeling: number;

  @ApiProperty()
  energyConsumption: number;

  @ApiProperty()
  hrIntensity: HrIntensityDto;

  @ApiProperty({ type: [WorkoutMultisportSummary] })
  multisportSummary: WorkoutMultisportSummary[];
}
