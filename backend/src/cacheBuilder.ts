import fs from "fs";

import { readJson, writeJson } from "./utils/jsonHelper";
import { getMultisportExtension } from "./model/getWorkoutExtension";
import {
  WORKOUT_LIST_RAW_FILENAME,
  WORKOUT_LIST_FILENAME,
  CACHE_DIR,
  getWorkoutRawDataFilename,
} from "./constants/filesNames";

const MULTISPORT_ACTIVITY_ID = 68;

export const buildWorkoutSummaryDataCache = () => {
  ensureCacheDirectoryExists();
  console.log("Building workout summary data to cache from workout list");
  const allWorkoutListData: IWorkoutList = readJson(WORKOUT_LIST_RAW_FILENAME);
  const workoutSummartData = allWorkoutListData.payload.map(
    parseWorkoutSummarData
  );
  writeJson(WORKOUT_LIST_FILENAME, workoutSummartData);
};

const ensureCacheDirectoryExists = () =>
  !fs.existsSync(CACHE_DIR) && fs.mkdirSync(CACHE_DIR);

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
  const summaryExtension = extensions.find(
    (extension) => extension.type === "SummaryExtension"
  );

  const { hrmax, avg: hravg } = hrdata;
  const { avgSpeed, avgCadence, feeling } =
    typeof summaryExtension !== "undefined" ? summaryExtension : <IExtension>{};
  const multisportSummary =
    activityId === MULTISPORT_ACTIVITY_ID
      ? getWorkoutMultisportSummaryData(workoutKey)
      : <IWorkoutMultisportSummaryData[]>[];

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
    multisportSummary,
  };
};

const getWorkoutMultisportSummaryData = (workoutId: string) => {
  const getMissingMultisportSummaryFromWorkout = (
    workoutRawData: IWorkoutRawData,
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
          activityId: activityId,
          ascent: ascent + currentValue.ascent,
          distance: distance + currentValue.distance,
          duration: duration + currentValue.duration,
        } as IWorkoutMultisportSummaryData;
      }
    );
    return {
      activityId: missingActivityId,
      distance: workoutRawData.totalDistance - knowMultisportSummaries.distance,
      duration: workoutRawData.totalTime - knowMultisportSummaries.duration,
      ascent: workoutRawData.totalAscent - knowMultisportSummaries.ascent,
      avgSpeed: NaN,
      avgHr: NaN,
      maxHr: NaN,
      maxSpeed: NaN,
    };
  };
  const workoutRawData = <IWorkoutRawDataContainer>(
    readJson(getWorkoutRawDataFilename(workoutId))
  );
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
