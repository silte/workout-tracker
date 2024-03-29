import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { ObjectId } from '../../types/objectId';
import { UserPreferencesService } from '../user-preferences/user-preferences.service';
import { UsersService } from '../users/users.service';
import { WorkoutSummaryService } from '../workout-summary/workout-summary.service';

import { UserDataExportDto } from './dto/user-data-export.dto';
import { UserDataImportDto } from './dto/user-data-import.dto';

const getMyDataFilename = (): string => {
  const addLeadingZero = (number: number): string => `0${number}`.substr(-2);

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `my-financer-data-${year}${addLeadingZero(month)}${addLeadingZero(
    day,
  )}.json`;
};

@Injectable()
export class UserDataService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private workoutSummaryService: WorkoutSummaryService,
    private userPreferencesService: UserPreferencesService,
  ) {}

  async findAllOneUserData(
    userId: ObjectId,
  ): Promise<{ filename: string; data: UserDataExportDto }> {
    const user = await this.usersService.findOne(userId);
    const workoutSummaries = await this.workoutSummaryService.exportAllByUser(
      userId,
    );
    const userPreferences = await this.userPreferencesService.findAll(userId);

    const filename = getMyDataFilename();
    const data = {
      user,
      userPreferences,
      workoutSummaries,
    };

    return { filename, data };
  }

  async overrideUserData(
    userId: ObjectId,
    { workoutSummaries = [], userPreferences = [] }: UserDataImportDto,
  ) {
    await Promise.all([
      this.workoutSummaryService.removeAllByUser(userId),
      this.userPreferencesService.removeAllByUser(userId),
    ]);

    const parsedWorkoutSummaries = workoutSummaries.map((workoutSummary) => ({
      ...workoutSummary,
      userId,
    }));

    const parsedUserPreferences = userPreferences.map((userPreference) => ({
      ...userPreference,
      userId,
    }));

    await Promise.all([
      this.workoutSummaryService.createMany(parsedWorkoutSummaries),
      this.userPreferencesService.createMany(parsedUserPreferences),
    ]);

    return { payload: 'Successfully overrided data.' };
  }
}
