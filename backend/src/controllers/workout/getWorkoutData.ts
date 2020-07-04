import { DATA_DIR } from "../../constants/filesNames";
import { readJson } from "../../utils/jsonHelper";

export const getWorkoutData = (workoutId: string) => {
  const filename = `${DATA_DIR}/${workoutId}.json`;
  return readJson(filename);
};
