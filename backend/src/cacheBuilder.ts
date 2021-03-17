/* eslint-disable no-console */
import fs from "fs";

import { readJson, writeJson } from "./utils/jsonHelper";
import {
  getMultisportExtension,
  getIntensityExtension,
} from "./model/getWorkoutExtension";
import {
  WORKOUT_LIST_RAW_FILENAME,
  WORKOUT_LIST_FILENAME,
  CACHE_DIR,
  getWorkoutRawDataFilename,
} from "./constants/filesNames";

const MULTISPORT_ACTIVITY_ID = 68;

const ensureCacheDirectoryExists = () =>
  !fs.existsSync(CACHE_DIR) && fs.mkdirSync(CACHE_DIR);

const getHrIntensityData = ({
  payload: workoutData,
}: IWorkoutRawDataContainer): IZoneSummary => {
  const intensityExtension = getIntensityExtension(workoutData);
  return {
    ...intensityExtension?.zones?.heartRate,
  };
};

const getWorkoutMultisportSummaryData = (
  workoutRawData: IWorkoutRawDataContainer
) => {
  const getMissingMultisportSummaryFromWorkout = (
    activityRawData: IWorkoutRawData,
    workoutMultisportSummaryData: IWorkoutMultisportSummaryData[],
    missingActivityId: number
  ): IWorkoutMultisportSummaryData => {
    const knowMultisportSummaries = workoutMultisportSummaryData.reduce(
      (
        {
          activityId,
          ascent,
          distance,
          duration,
        }: IWorkoutMultisportSummaryData,
        currentValue
      ) => {
        return {
          activityId,
          ascent: ascent + currentValue.ascent,
          distance: distance + currentValue.distance,
          duration: duration + currentValue.duration,
        } as IWorkoutMultisportSummaryData;
      }
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

  const multisportExtensionData = getMultisportExtension(
    workoutRawData.payload
  );

  if (typeof multisportExtensionData.Markers === "undefined") {
    return [];
  }

  const filteredMultisportExtensions = multisportExtensionData.Markers.filter(
    (activity) => activity.Totals !== null && activity.Totals.duration !== null
  );
  const missingMultisportTotalsCount = multisportExtensionData.Markers.filter(
    (activity) => activity.Totals === null || activity.Totals.duration === null
  ).length;

  if (
    typeof filteredMultisportExtensions === "undefined" ||
    missingMultisportTotalsCount >= 2
  ) {
    return [];
  }

  const multisportSummaries = filteredMultisportExtensions.map(
    ({ ActivityID, Totals: { duration, distance, ascent, hr, speed } }) => {
      const { avg: avgHr, max: maxHr } = hr !== null ? hr : <ISummary>{};
      const { avg: avgSpeed, max: maxSpeed } =
        speed !== null ? speed : <ISummary>{};

      return <IWorkoutMultisportSummaryData>{
        activityId: ActivityID,
        duration,
        distance,
        ascent,
        maxHr,
        avgHr,
        maxSpeed,
        avgSpeed,
      };
    }
  );

  if (missingMultisportTotalsCount === 0) {
    return multisportSummaries;
  }
  const missingActivityId = multisportExtensionData.Markers.find(
    (activity) => activity.Totals === null
  )?.ActivityID;

  const missingMultisportActivity = getMissingMultisportSummaryFromWorkout(
    workoutRawData.payload,
    multisportSummaries,
    missingActivityId as number
  );

  return multisportSummaries.concat(missingMultisportActivity);
};

const parseWorkoutSummarData = ({
  extensions = [],
  hrdata = <IHrdata>{},
  activityId,
  workoutKey,
  startTime,
  totalTime,
  totalDistance,
  totalAscent,
  totalDescent,
  maxSpeed,
  energyConsumption,
}: IWorkoutListItem): IWorkoutSummaryData => {
  const workoutRawData = <IWorkoutRawDataContainer>(
    readJson(getWorkoutRawDataFilename(workoutKey))
  );

  const summaryExtension = extensions.find(
    (extension) => extension.type === "SummaryExtension"
  );

  const { hrmax, avg: hravg } = hrdata;
  const { avgSpeed, avgCadence, feeling } =
    typeof summaryExtension !== "undefined" ? summaryExtension : <IExtension>{};
  const multisportSummary =
    activityId === MULTISPORT_ACTIVITY_ID
      ? getWorkoutMultisportSummaryData(workoutRawData)
      : <IWorkoutMultisportSummaryData[]>[];
  const hrIntensity = getHrIntensityData(workoutRawData);

  return {
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
};

const buildWorkoutSummaryDataCache = (forceCacheRebuild = false): void => {
  ensureCacheDirectoryExists();
  console.log("Building workout summary data to cache from workout list");
  const startTime = Date.now();
  const allWorkoutListData: IWorkoutList = readJson(WORKOUT_LIST_RAW_FILENAME);

  if (!forceCacheRebuild) {
    const isCacheAvailable = fs.existsSync(WORKOUT_LIST_FILENAME);
    const cachedWorkoutSummaryData: IWorkoutSummaryData[] = isCacheAvailable
      ? readJson(WORKOUT_LIST_FILENAME)
      : [];
    const missingFromCacheWorkoutListData = allWorkoutListData.payload.filter(
      ({ workoutKey }) =>
        cachedWorkoutSummaryData.every(
          ({ workoutKey: cachedWorkoutKey }) => workoutKey !== cachedWorkoutKey
        )
    );
    if (missingFromCacheWorkoutListData.length === 0) {
      console.log("All workouts found from cache, no need to build cache");
    } else {
      console.log(
        `Adding ${missingFromCacheWorkoutListData.length} workout(s) to cache, total ${allWorkoutListData.payload.length} workout(s)`
      );
      const workoutSummartData = missingFromCacheWorkoutListData.map(
        parseWorkoutSummarData
      );
      writeJson(
        WORKOUT_LIST_FILENAME,
        workoutSummartData.concat(cachedWorkoutSummaryData)
      );
    }
  } else {
    console.log("Full cache rebuild");
    const workoutSummartData = allWorkoutListData.payload.map(
      parseWorkoutSummarData
    );
    writeJson(WORKOUT_LIST_FILENAME, workoutSummartData);
  }

  const endTime = Date.now();
  const processingTime = (endTime - startTime) / 1000;
  console.log(`Done in ${processingTime.toFixed(1)} seconds`);
};

export default buildWorkoutSummaryDataCache;
