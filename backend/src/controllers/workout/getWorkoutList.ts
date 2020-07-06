import { readJson } from "../../utils/jsonHelper";
import { WORKOUT_LIST_FILENAME } from "../../constants/filesNames";

export const getWorkoutList = () => {
  return <IWorkoutSummaryData>readJson(WORKOUT_LIST_FILENAME);
};
