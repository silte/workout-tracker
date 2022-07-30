import { ApiProperty } from '@nestjs/swagger';

export class PositionCoordinatesDto {
  @ApiProperty()
  x: number;

  @ApiProperty()
  y: number;
}
