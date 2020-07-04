import fs from "fs";
import { WORKOUT_LIST_FILENAME, DATA_DIR } from "../constants/filesNames";
import { readJson, downloadJson } from "../utils/jsonHelper";
import { getWorkoutEndpoint } from "../constants/endpoints";

const FETCH_INTERVAL_MS = 1000;

export const fetchWorkoutsFromList = (apiToken: string) => {
  if (!fs.existsSync(WORKOUT_LIST_FILENAME)) {
    console.log("Workout list is required before you can fetch workouts.\n");
    process.exit();
  }

  const { payload: workoutList }: IWorkoutList = readJson(
    WORKOUT_LIST_FILENAME
  );
  console.log(
    `Fetching ${workoutList.length} workouts with api token ${apiToken}`
  );
  fetchWorkouts(workoutList, apiToken);
};

const fetchWorkouts = (
  workoutList: IWorkoutListItem[],
  apiToken: string,
  iterator = 0,
  downloaded = 0,
  cached = 0
) => {
  let sleepTime = FETCH_INTERVAL_MS;
  const { workoutKey: workoutId } = workoutList[iterator];

  const endpoint = getWorkoutEndpoint(workoutId, apiToken);
  const filename = `${DATA_DIR}/${workoutId}.json`;
  if (!fs.existsSync(filename)) {
    console.log(`Downloading workout ${iterator + 1}/${workoutList.length}`);
    downloadJson(filename, endpoint);
    downloaded++;
  } else {
    sleepTime = 0;
    cached++;
  }

  iterator++;
  if (workoutList.length > iterator) {
    setTimeout(
      fetchWorkouts,
      sleepTime,
      workoutList,
      apiToken,
      iterator,
      downloaded,
      cached
    );
  } else {
    console.log(
      `${downloaded} workouts download and ${cached} workout found from cache`
    );
  }
};
