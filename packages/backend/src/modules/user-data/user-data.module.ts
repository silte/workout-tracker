import { Module, forwardRef } from '@nestjs/common';

import { UserPreferencesModule } from '../user-preferences/user-preferences.module';
import { UsersModule } from '../users/users.module';
import { WorkoutSummaryModule } from '../workout-summary/workout-summary.module';

import { UserDataService } from './user-data.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    WorkoutSummaryModule,
    UserPreferencesModule,
  ],
  providers: [UserDataService],
  exports: [UserDataService],
})
export class UserDataModule {}
