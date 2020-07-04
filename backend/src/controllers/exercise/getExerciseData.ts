import { DATA_DIR } from "../../constants/filesNames";
import { readJson } from "../../utils/jsonHelper";

export const getExerciseData = (exerciseId: string) => {
  const filename = `${DATA_DIR}/${exerciseId}.json`;
  return readJson(filename);
};
