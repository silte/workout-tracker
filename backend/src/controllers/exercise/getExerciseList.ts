import { readJson } from "../../utils/jsonHelper";
import { EXERCISE_LIST_FILENAME } from "../../constants/filesNames";

export const getExerciseList = () => {
  const allExerciseListData: IWorkoutList = readJson(EXERCISE_LIST_FILENAME);
  return allExerciseListData.payload.map(filterExerciseListItemContent);
};

const filterExerciseListItemContent = (
  workout: IWorkoutListItem
): IExerciseSummaryData => {
  const {
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
  } = workout;

  const summaryExtension = extensions.find(
    (extension) => extension.type === "SummaryExtension"
  );

  const { hrmax, avg: hravg } = hrdata;
  const { avgSpeed, avgCadence, feeling } =
    typeof summaryExtension !== "undefined" ? summaryExtension : <IExtension>{};

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
  };
};
