import fs from 'fs';

import { WorkoutDataPoint } from '@local/types';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ObjectId } from '../../types/objectId';
import {
  BaseExtension,
  DataPoint,
  SummaryExtension,
} from '../../types/workout-raw/workout-extensions';
import {
  WorkoutRaw,
  WorkoutRawContainer,
} from '../../types/workout-raw/workout-raw';
import { getWorkoutEndpoint } from '../../utils/endpoints';
import { getWorkoutRawDataFilename } from '../../utils/filesNames';
import { downloadJson, readJson } from '../../utils/jsonHelper';
import { roundToSingleDecimal, roundToThousands } from '../../utils/numbers';
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

  static async parseWorkout(workoutId: string): Promise<any> {
    const filename = getWorkoutRawDataFilename(workoutId);
    const { payload: workoutData } = <WorkoutRawContainer>readJson(filename);
    const {
      activityId,
      startTime,
      totalAscent,
      totalDescent,
      totalDistance,
      totalTime,
      centerPosition,
      startPosition,
      stopPosition,
      maxSpeed,
      maxAltitude,
      minAltitude,
      workoutKey,
    } = workoutData;
    const cadenceExtension = this.getSummaryExtension(workoutData);

    const dataPoints = this.parseDataPoints(workoutData);

    return {
      workoutKey,
      activityId,
      startTime,
      totalAscent,
      totalDescent,
      totalDistance,
      totalTime,
      centerPosition,
      startPosition,
      stopPosition,
      maxSpeed: parseFloat((maxSpeed * 3.6).toFixed(1)),
      maxAltitude,
      minAltitude,
      avgCadence: cadenceExtension?.avgCadence,
      maxCadence: cadenceExtension?.maxCadence,
      dataPoints,
    };
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

  private static getSummaryExtension(
    workoutRawData: WorkoutRaw,
  ): SummaryExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'SummaryExtension',
    );
    return typeof extension !== 'undefined'
      ? <SummaryExtension>extension
      : <SummaryExtension>{};
  }

  private static parseDataPoints(
    workoutRawData: WorkoutRaw,
  ): WorkoutDataPoint[] {
    const dataPoints = {} as {
      [timestamp in number]: { [dataPointKey in string]: string | number };
    };

    const roundDataPointTimestampToSeconds = ({
      timestamp,
      value,
    }: DataPoint): DataPoint => ({
      timestamp: roundToThousands(timestamp),
      value,
    });
    const addValueToDatapoint =
      (dataPointName: string) =>
      ({ timestamp, value }: DataPoint) => {
        if (!(timestamp in dataPoints)) {
          dataPoints[timestamp] = {};
        }
        dataPoints[timestamp][dataPointName] = value;
      };
    const hrData = this.getHeartrateStreamExtension(workoutRawData).points?.map(
      roundDataPointTimestampToSeconds,
    );
    const speedData = this.getSpeedStreamExtension(workoutRawData)
      .points?.map(roundDataPointTimestampToSeconds)
      .map((dataPoint) => ({
        ...dataPoint,
        value: roundToSingleDecimal(dataPoint.value * 3.6),
      }));

    const distanceData = this.getDistanceDeltaStreamExtension(
      workoutRawData,
    ).points?.map(roundDataPointTimestampToSeconds);
    const altitudeData = this.getAltitudeStreamExtension(
      workoutRawData,
    ).points?.map(roundDataPointTimestampToSeconds);
    const cadenceData = this.getCadenceStreamExtension(
      workoutRawData,
    ).points?.map(roundDataPointTimestampToSeconds);

    hrData?.forEach(addValueToDatapoint('hr'));
    speedData?.forEach(addValueToDatapoint('speed'));
    distanceData?.forEach(addValueToDatapoint('distance'));
    altitudeData?.forEach(addValueToDatapoint('altitude'));
    cadenceData?.forEach(addValueToDatapoint('cadence'));

    return Object.entries(dataPoints).map(([timestamp, content]) => ({
      timestamp,
      ...content,
    }));
  }

  private static getHeartrateStreamExtension(
    workoutRawData: WorkoutRaw,
  ): BaseExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) =>
        currentExtension.type === 'HeartrateStreamExtension',
    );
    return typeof extension !== 'undefined'
      ? <BaseExtension>extension
      : <BaseExtension>{};
  }

  private static getSpeedStreamExtension(
    workoutRawData: WorkoutRaw,
  ): BaseExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'SpeedStreamExtension',
    );
    return typeof extension !== 'undefined'
      ? <BaseExtension>extension
      : <BaseExtension>{};
  }

  private static getDistanceDeltaStreamExtension(
    workoutRawData: WorkoutRaw,
  ): BaseExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) =>
        currentExtension.type === 'DistanceDeltaStreamExtension',
    );
    return typeof extension !== 'undefined'
      ? <BaseExtension>extension
      : <BaseExtension>{};
  }

  private static getAltitudeStreamExtension(
    workoutRawData: WorkoutRaw,
  ): BaseExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'AltitudeStreamExtension',
    );
    return typeof extension !== 'undefined'
      ? <BaseExtension>extension
      : <BaseExtension>{};
  }

  private static getCadenceStreamExtension(
    workoutRawData: WorkoutRaw,
  ): BaseExtension {
    const extension = workoutRawData.extensions.find(
      (currentExtension) => currentExtension.type === 'CadenceStreamExtension',
    );
    return typeof extension !== 'undefined'
      ? <BaseExtension>extension
      : <BaseExtension>{};
  }
}
