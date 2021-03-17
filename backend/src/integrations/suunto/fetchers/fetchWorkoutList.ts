import fs from "fs";

import { getWorkoutListEndpoint } from "../../../constants/endpoints";
import {
  WORKOUT_LIST_RAW_FILENAME,
  DATA_DIR,
} from "../../../constants/filesNames";
import { downloadJson } from "../../../utils/jsonHelper";

const ensureDataDirectoryExists = () =>
  !fs.existsSync(DATA_DIR) && fs.mkdirSync(DATA_DIR);

const fetchWorkoutList = async (apiToken: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(`Fetching workout list with api token: ${apiToken}`);
  ensureDataDirectoryExists();

  const endpoint = getWorkoutListEndpoint(apiToken);
  await downloadJson(WORKOUT_LIST_RAW_FILENAME, endpoint);
};

export default fetchWorkoutList;
