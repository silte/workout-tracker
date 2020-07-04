import { readJson } from "../../utils/jsonHelper";
import { WORKOUT_LIST_FILENAME } from "../../constants/filesNames";

export const getWorkoutList = () => {
  const allWorkoutListData: IWorkoutList = readJson(WORKOUT_LIST_FILENAME);
  return allWorkoutListData.payload.map(filterWorkoutListItemContent);
};

const filterWorkoutListItemContent = ({
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
}: IWorkoutListItem): IWorkoutSummaryData => {
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
