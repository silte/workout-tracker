import fs from "fs";
import { EXERCISE_LIST_FILENAME, DATA_DIR } from "../constants/filesNames";
import { readJson, downloadJson } from "../utils/jsonHelper";
import { getExerciseEndpoint } from "../constants/endpoints";

const FETCH_INTERVAL_MS = 1000;

export const fetchExercisesFromList = (apiToken: string) => {
  if (!fs.existsSync(EXERCISE_LIST_FILENAME)) {
    console.log(
      "Excercise list is required before you can fetch excercises.\n"
    );
    process.exit();
  }

  const { payload: excerciseList } = readJson(EXERCISE_LIST_FILENAME);
  console.log(
    `Fetching ${excerciseList.length} excercises with api token ${apiToken}`
  );
  fetchExcercises(excerciseList, apiToken);
};

const fetchExcercises = (
  excerciseList: IWorkoutListItem[],
  apiToken: string,
  iterator = 0,
  downloaded = 0,
  cached = 0
) => {
  let sleepTime = FETCH_INTERVAL_MS;
  const { workoutKey: excerciseId } = excerciseList[iterator];

  const endpoint = getExerciseEndpoint(excerciseId, apiToken);
  const filename = `${DATA_DIR}/${excerciseId}.json`;
  if (!fs.existsSync(filename)) {
    console.log(`Downloading exercise ${iterator + 1}/${excerciseList.length}`);
    downloadJson(filename, endpoint);
    downloaded++;
  } else {
    sleepTime = 0;
    cached++;
  }

  iterator++;
  if (excerciseList.length > iterator) {
    setTimeout(
      fetchExcercises,
      sleepTime,
      excerciseList,
      apiToken,
      iterator,
      downloaded,
      cached
    );
  } else {
    console.log(
      `${downloaded} exercises download and ${cached} exercise found from cache`
    );
  }
};
