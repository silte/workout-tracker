import fs from "fs";

import { readJson, writeJson } from "./utils/jsonHelper";
import { getMultisportExtension } from "./model/getWorkoutExtension";
import {
  WORKOUT_LIST_RAW_FILENAME,
  getWorkoutRawDataFilename,
  WORKOUT_LIST_FILENAME,
  CACHE_DIR,
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
    (activity) => activity.Totals !== null
  );

  if (typeof filteredMultisportExtensions === "undefined") {
    return [];
  }

  return filteredMultisportExtensions.map(
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
};
