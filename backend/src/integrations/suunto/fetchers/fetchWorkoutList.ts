import fs from "fs";

import { getWorkoutListEndpoint } from "../../../constants/endpoints";
import { WORKOUT_LIST_RAW_FILENAME, DATA_DIR } from "../../../constants/filesNames";
import { downloadJson } from "../../../utils/jsonHelper";

export const fetchWorkoutList = async (apiToken: string) => {
  console.log(`Fetching workout list with api token: ${apiToken}`);
  ensureDataDirectoryExists();

  const endpoint = getWorkoutListEndpoint(apiToken);
  await downloadJson(WORKOUT_LIST_RAW_FILENAME, endpoint);
};

const ensureDataDirectoryExists = () =>
  !fs.existsSync(DATA_DIR) && fs.mkdirSync(DATA_DIR);
