import { readJson } from "../../utils/jsonHelper";
import { WORKOUT_LIST_FILENAME } from "../../constants/filesNames";

const getWorkoutList = () => {
  return <IWorkoutSummaryData>readJson(WORKOUT_LIST_FILENAME);
};

export default getWorkoutList;
