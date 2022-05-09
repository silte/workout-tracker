import { WorkoutMultisportSummary } from '@local/types';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

import { HrData } from '../../types/common-raw/hr-data';
import { ObjectId } from '../../types/objectId';
import {
  IntensityExtension,
  MultisportExtension,
  Summary,
} from '../../types/workout-raw/workout-extensions';
import {
  WorkoutRaw,
  WorkoutRawContainer,
} from '../../types/workout-raw/workout-raw';
import { ZoneSummary } from '../../types/workout-raw/zone-data';
import {
  Extension,
  WorkoutSummaryRaw,
  WorkoutSummaryRawWrapper,
} from '../../types/workout-summary-raw/workout-summary-raw';
import { getWorkoutListEndpoint } from '../../utils/endpoints';
import { getWorkoutRawDataFilename } from '../../utils/filesNames';
import { readJson } from '../../utils/jsonHelper';
import { SuuntoApiInfoService } from '../suunto-api-info/suunto-api-info.service';
import { WorkoutSummaryRawService } from '../workout-summary-raw/workout-summary-raw.service';
import { CreateWorkoutSummaryDto } from '../workout-summary/dto/create-workout-summary.dto';
import { WorkoutSummaryService } from '../workout-summary/workout-summary.service';

const MULTISPORT_ACTIVITY_ID = 68;

@Injectable()
export class WorkoutListHandlerService {
  private readonly logger = new Logger(WorkoutListHandlerService.name);

  constructor(
    private readonly suuntoApiInfoService: SuuntoApiInfoService,
    private readonly workoutSummaryRawService: WorkoutSummaryRawService,
    private readonly workoutSummaryService: WorkoutSummaryService,
    private readonly configService: ConfigService,
  ) {}

  async updateWorkoutList(apiToken: string, userId: ObjectId): Promise<void> {
    await this.addLogEntry(userId, `Updating workout list`);

    const updatedSummaryList = await this.fetchWorkoutList(apiToken);

    const workoutKeys = (
      await this.workoutSummaryRawService.findAllKeysByUser(userId)
    ).map(({ workoutKey }) => workoutKey);

    const missingRawSummaries = updatedSummaryList.payload.filter(
      ({ workoutKey }) => !workoutKeys.includes(workoutKey),
    );

    await this.workoutSummaryRawService.createMany(
      missingRawSummaries.map((summary) => ({
        ...summary,
        userId,
      })),
    );
  }

  async buildWorkoutSummaryDataCache(userId: ObjectId): Promise<void> {
    const startTime = Date.now();
    await this.addLogEntry(
      userId,
      'Building workout summary data to cache from workout list',
    );
    const rawWorkoutSummaries =
      await this.workoutSummaryRawService.findAllByUser(userId);

    if (rawWorkoutSummaries === null) {
      await this.addLogEntry(
        userId,
        'Workout list not found cannot build summary list to cache',
      );
      return;
    }

    const workoutSummaries = await this.workoutSummaryService.findAll(userId);
    const cachedWorkoutKeys = workoutSummaries?.map(
      ({ workoutKey }) => workoutKey,
    );
    const missingFromWorkoutSummaryCache = rawWorkoutSummaries.filter(
      ({ workoutKey }) => !cachedWorkoutKeys?.includes(workoutKey),
    );
    if (missingFromWorkoutSummaryCache.length === 0) {
      await this.addLogEntry(
        userId,
        'All workouts found from cache, no need to build cache',
      );
      return;
    }
    await this.addLogEntry(
      userId,
      `Adding ${missingFromWorkoutSummaryCache.length} workout(s) to cache, total ${rawWorkoutSummaries.length} workout(s)`,
    );

    const chunkSize = this.configService.get<number>(
      'workoutBuildCacheChunkSize',
    );
    const fetchGroupCount = Math.ceil(
      missingFromWorkoutSummaryCache.length / chunkSize,
    );

    for (let i = 0; i < fetchGroupCount; i++) {
      const chunkFirstItem = i * chunkSize;
      const chunk = missingFromWorkoutSummaryCache.slice(
        chunkFirstItem,
        (i + 1) * chunkSize,
      );

      const chunkNewItemsToCache = await Promise.all(
        chunk.map((summary) => this.parseWorkoutSummarData(summary, userId)),
      );

      await this.workoutSummaryService.createMany(chunkNewItemsToCache);
    }

    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;
    await this.addLogEntry(
      userId,
      `Cache build done in ${processingTime.toFixed(1)} seconds`,
    );
  }

  private async addLogEntry(userId: ObjectId, message: string): Promise<void> {
    this.logger.log(`${message} for user ${userId}`);
    await this.suuntoApiInfoService.addMessageItem(userId, message);
  }

  private async fetchWorkoutList(
    apiToken: string,
  ): Promise<WorkoutSummaryRawWrapper> {
    const endpoint = getWorkoutListEndpoint(apiToken);

    const response = await fetch(endpoint);
    return response.json() as Promise<WorkoutSummaryRawWrapper>;
  }

  private async parseWorkoutSummarData(
    {
      extensions = [],
      hrdata = <HrData>{},
      activityId,
      workoutKey,
      startTime,
      totalTime,
      totalDistance,
      totalAscent,
      totalDescent,
      maxSpeed,
      energyConsumption,
    }: WorkoutSummaryRaw,
    userId: ObjectId,
  ): Promise<CreateWorkoutSummaryDto> {
    const workoutRawData = <WorkoutRawContainer>(
      readJson(getWorkoutRawDataFilename(workoutKey))
    );

    const summaryExtension = extensions.find(
      (extension) => extension.type === 'SummaryExtension',
    );

    const { hrmax, avg: hravg } = hrdata;
    const { avgSpeed, avgCadence, feeling } =
      typeof summaryExtension !== 'undefined'
        ? summaryExtension
        : <Extension>{};

    const multisportSummary =
      activityId === MULTISPORT_ACTIVITY_ID
        ? this.getWorkoutMultisportSummaryData(workoutRawData)
        : <WorkoutMultisportSummary[]>[];

    const hrIntensity = this.getHrIntensityData(workoutRawData);

    return {
      userId,
      activityId,
      workoutKey,
      startTime,
      totalTime,
      totalDistance,
      totalAscent,
      totalDescent,
      maxSpeed,
      hrmax,
      hravg,
      avgSpeed,
      avgCadence,
      feeling,
      energyConsumption,
      hrIntensity,
      multisportSummary,
    };
  }

  private getWorkoutMultisportSummaryData(workoutRawData: WorkoutRawContainer) {
    const getMissingMultisportSummaryFromWorkout = (
      activityRawData: WorkoutRaw,
      workoutMultisportSummaryData: WorkoutMultisportSummary[],
      missingActivityId: number,
    ): WorkoutMultisportSummary => {
      const knowMultisportSummaries = workoutMultisportSummaryData.reduce(
        (
          { activityId, ascent, distance, duration }: WorkoutMultisportSummary,
          currentValue,
        ) => {
          return {
            activityId,
            ascent: ascent + currentValue.ascent,
            distance: distance + currentValue.distance,
            duration: duration + currentValue.duration,
          } as WorkoutMultisportSummary;
        },
      );
      return {
        activityId: missingActivityId,
        distance:
          activityRawData.totalDistance - knowMultisportSummaries.distance,
        duration: activityRawData.totalTime - knowMultisportSummaries.duration,
        ascent: activityRawData.totalAscent - knowMultisportSummaries.ascent,
        avgSpeed: NaN,
        avgHr: NaN,
        maxHr: NaN,
        maxSpeed: NaN,
      };
    };

    const multisportExtensionData = this.getMultisportExtension(
      workoutRawData.payload,
    );

    if (typeof multisportExtensionData.Markers === 'undefined') {
      return [];
    }

    const filteredMultisportExtensions = multisportExtensionData.Markers.filter(
      (activity) =>
        activity.Totals !== null && activity.Totals.duration !== null,
    );
    const missingMultisportTotalsCount = multisportExtensionData.Markers.filter(
      (activity) =>
        activity.Totals === null || activity.Totals.duration === null,
    ).length;

    if (
      typeof filteredMultisportExtensions === 'undefined' ||
      missingMultisportTotalsCount >= 2
    ) {
      return [];
    }

    const multisportSummaries = filteredMultisportExtensions.map(
      ({ ActivityID, Totals: { duration, distance, ascent, hr, speed } }) => {
        const { avg: avgHr, max: maxHr } = hr !== null ? hr : <Summary>{};
        const { avg: avgSpeed, max: maxSpeed } =
          speed !== null ? speed : <Summary>{};

        return <WorkoutMultisportSummary>{
          activityId: ActivityID,
          duration,
          distance,
          ascent,
          maxHr,
          avgHr,
          maxSpeed,
          avgSpeed,
        };
      },
    );

    if (missingMultisportTotalsCount === 0) {
      return multisportSummaries;
    }
    const missingActivityId = multisportExtensionData.Markers.find(
      (activity) => activity.Totals === null,
    )?.ActivityID;

    const missingMultisportActivity = getMissingMultisportSummaryFromWorkout(
      workoutRawData.payload,
      multisportSummaries,
      missingActivityId as number,
    );

    return multisportSummaries.concat(missingMultisportActivity);
  }

  private getMultisportExtension = (
    workoutRawData: WorkoutRaw,
  ): MultisportExtension => {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'MultisportMarker',
    );
    return typeof extension !== 'undefined'
      ? <MultisportExtension>extension
      : <MultisportExtension>{};
  };

  private getHrIntensityData({
    payload: workoutData,
  }: WorkoutRawContainer): ZoneSummary {
    const intensityExtension = this.getIntensityExtension(workoutData);
    return {
      ...intensityExtension?.zones?.heartRate,
    };
  }

  private getIntensityExtension(
    workoutRawData: WorkoutRaw,
  ): IntensityExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'IntensityExtension',
    );
    return typeof extension !== 'undefined'
      ? <IntensityExtension>extension
      : <IntensityExtension>{};
  }
}
