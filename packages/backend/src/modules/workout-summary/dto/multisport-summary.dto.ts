import { ApiProperty } from '@nestjs/swagger';

export class WorkoutMultisportSummary {
  @ApiProperty()
  activityId: number;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  distance: number;

  @ApiProperty()
  ascent: number;

  @ApiProperty()
  maxHr: number;

  @ApiProperty()
  avgHr: number;

  @ApiProperty()
  maxSpeed: number;

  @ApiProperty()
  avgSpeed: number;
}
