import fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ObjectId } from '../../types/objectId';
import { getWorkoutEndpoint } from '../../utils/endpoints';
import { getWorkoutRawDataFilename } from '../../utils/filesNames';
import { downloadJson } from '../../utils/jsonHelper';
import { SuuntoApiInfoService } from '../suunto-api-info/suunto-api-info.service';
import { WorkoutSummaryRawService } from '../workout-summary-raw/workout-summary-raw.service';

@Injectable()
export class WorkoutHandlerService {
  private readonly logger = new Logger(WorkoutHandlerService.name);

  constructor(
    private readonly suuntoApiInfoService: SuuntoApiInfoService,
    private readonly workoutSummaryRawService: WorkoutSummaryRawService,
    private readonly configService: ConfigService,
  ) {}

  async fetchWorkoutsFromList(
    apiToken: string,
    userId: ObjectId,
  ): Promise<void> {
    const workoutList = await this.workoutSummaryRawService.findAllByUser(
      userId,
    );

    if (workoutList === null) {
      await this.addLogEntry(
        userId,
        'Workout list not found, cannot fetch workouts',
      );
      return;
    }

    const totalCount = workoutList.length;
    await this.addLogEntry(userId, `Fetching ${totalCount} workouts`);

    let fetchResults: { cached: number; downloaded: number }[] = [];

    const chunkSize = this.configService.get<number>('workoutFetchChunkSize');
    const fetchGroupCount = Math.ceil(workoutList.length / chunkSize);

    for (let i = 0; i < fetchGroupCount; i++) {
      const chunkFirstItem = i * chunkSize;
      const chunk = workoutList.slice(chunkFirstItem, (i + 1) * chunkSize);

      const chunkFetchResults = await Promise.all(
        chunk.map(async ({ workoutKey }, index) =>
          this.fetchWorkout(
            workoutKey,
            apiToken,
            chunkFirstItem + index,
            totalCount,
            userId,
          ),
        ),
      );

      fetchResults = fetchResults.concat(chunkFetchResults);
    }

    const totalCached = fetchResults.reduce(
      (prev, { cached }) => prev + cached,
      0,
    );
    const totalDownloaded = fetchResults.reduce(
      (prev, { downloaded }) => prev + downloaded,
      0,
    );

    await this.addLogEntry(
      userId,
      `${totalDownloaded} workouts download and ${totalCached} workout found from cache`,
    );
  }

  private async fetchWorkout(
    workoutId: string,
    apiToken: string,
    current: number,
    totalCount: number,
    userId: ObjectId,
  ): Promise<{ cached: number; downloaded: number }> {
    const endpoint = getWorkoutEndpoint(workoutId, apiToken);
    const filename = getWorkoutRawDataFilename(workoutId);

    if (!fs.existsSync(filename)) {
      await this.addLogEntry(
        userId,
        `Downloading workout ${current}/${totalCount}`,
      );

      await downloadJson(filename, endpoint);
      return { cached: 0, downloaded: 1 };
    }

    return { cached: 1, downloaded: 0 };
  }

  private async addLogEntry(userId: ObjectId, message: string): Promise<void> {
    this.logger.log(`${message} for user ${userId}`);
    await this.suuntoApiInfoService.addMessageItem(userId, message);
  }
}
