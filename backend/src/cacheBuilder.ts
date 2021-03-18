/* eslint-disable no-console */
import { readJson } from "./utils/jsonHelper";
import {
  getMultisportExtension,
  getIntensityExtension,
} from "./model/getWorkoutExtension";
import { getWorkoutRawDataFilename } from "./constants/filesNames";
import { findRawWorkoutSummariesByUser } from "./services/raw-workout-list-service";
import {
  findWorkoutSummariesByUser,
  createWorkoutListItem,
} from "./services/workout-list-service";
import { expandSuuntoEventlog } from "./integrations/suunto/logSuuntoFetchEvent";

const MULTISPORT_ACTIVITY_ID = 68;

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
    workoutMultisportSummaryData: IWorkoutMultisportSummary[],
    missingActivityId: number
  ): IWorkoutMultisportSummary => {
    const knowMultisportSummaries = workoutMultisportSummaryData.reduce(
      (
        { activityId, ascent, distance, duration }: IWorkoutMultisportSummary,
        currentValue
      ) => {
        return {
          activityId,
          ascent: ascent + currentValue.ascent,
          distance: distance + currentValue.distance,
          duration: duration + currentValue.duration,
        } as IWorkoutMultisportSummary;
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

      return <IWorkoutMultisportSummary>{
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
}: IRawWorkoutSummary): IWorkoutSummary => {
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
      : <IWorkoutMultisportSummary[]>[];
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

const buildWorkoutSummaryDataCache = async (userId: string): Promise<void> => {
  await expandSuuntoEventlog(
    userId,
    "Building workout summary data to cache from workout list"
  );
  const startTime = Date.now();
  const rawWorkoutSummaries = await findRawWorkoutSummariesByUser(userId);

  if (rawWorkoutSummaries === null) {
    console.error("Workout list not found cannot build summary list to cache");
    return;
  }

  const workoutSummaries = await findWorkoutSummariesByUser(userId);
  const cachedWorkoutKeys = workoutSummaries?.map(
    ({ workoutKey }) => workoutKey
  );
  const missingFromWorkoutSummaryCache = rawWorkoutSummaries.filter(
    ({ workoutKey }) => !cachedWorkoutKeys?.includes(workoutKey)
  );
  if (missingFromWorkoutSummaryCache.length === 0) {
    await expandSuuntoEventlog(
      userId,
      "All workouts found from cache, no need to build cache"
    );
    return;
  }
  await expandSuuntoEventlog(
    userId,
    `Adding ${missingFromWorkoutSummaryCache.length} workout(s) to cache, total ${rawWorkoutSummaries.length} workout(s)`
  );
  const newWorkoutSummariesToCache = missingFromWorkoutSummaryCache.map(
    parseWorkoutSummarData
  );

  await Promise.all(
    newWorkoutSummariesToCache.map((workout) =>
      createWorkoutListItem({ ...workout, userId })
    )
  );

  const endTime = Date.now();
  const processingTime = (endTime - startTime) / 1000;
  await expandSuuntoEventlog(
    userId,
    `Cache build done in ${processingTime.toFixed(1)} seconds`
  );
};

export default buildWorkoutSummaryDataCache;
