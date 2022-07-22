import { ApiProperty } from '@nestjs/swagger';

class IntesityZoneDto {
  @ApiProperty()
  totalTime: number;

  @ApiProperty()
  lowerLimit: number;
}

export class HrIntensityDto {
  @ApiProperty()
  zone1: IntesityZoneDto;

  @ApiProperty()
  zone2: IntesityZoneDto;

  @ApiProperty()
  zone3: IntesityZoneDto;

  @ApiProperty()
  zone4: IntesityZoneDto;

  @ApiProperty()
  zone5: IntesityZoneDto;
}
