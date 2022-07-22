import { ApiProperty } from '@nestjs/swagger';

import { UserPreferenceDto } from '../../user-preferences/dto/user-preference.dto';
import { UserDto } from '../../users/dto/user.dto';
import { WorkoutSummaryDto } from '../../workout-summary/dto/workout-summary.dto';

export class UserDataExportDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty({ type: [WorkoutSummaryDto] })
  workoutSummaries: WorkoutSummaryDto[];

  @ApiProperty({ type: [UserPreferenceDto] })
  userPreferences: UserPreferenceDto[];
}
