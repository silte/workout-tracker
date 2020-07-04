import fs from "fs";

import { getExerciseListEndpoint } from "../constants/endpoints";
import { EXERCISE_LIST_FILENAME, DATA_DIR } from "../constants/filesNames";
import { downloadJson } from "../utils/jsonHelper";

export const fetchExerciseList = async (apiToken: string) => {
  console.log(`Fetching exercise list with api token: ${apiToken}`);
  ensureDataDirectoryExists();

  const endpoint = getExerciseListEndpoint(apiToken);
  await downloadJson(EXERCISE_LIST_FILENAME, endpoint);
};

const ensureDataDirectoryExists = () =>
  !fs.existsSync(DATA_DIR) && fs.mkdirSync(DATA_DIR);
