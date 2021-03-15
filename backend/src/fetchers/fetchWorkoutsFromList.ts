import fs from "fs";
import {
  WORKOUT_LIST_RAW_FILENAME,
  getWorkoutRawDataFilename,
} from "../constants/filesNames";
import { readJson, downloadJson } from "../utils/jsonHelper";
import { getWorkoutEndpoint } from "../constants/endpoints";

export const fetchWorkoutsFromList = async (apiToken: string) => {
  if (!fs.existsSync(WORKOUT_LIST_RAW_FILENAME)) {
    console.log("Workout list is required before you can fetch workouts.\n");
    process.exit();
  }

  const { payload: workoutList }: IWorkoutList = readJson(
    WORKOUT_LIST_RAW_FILENAME
  );
  const totalCount = workoutList.length
  console.log(
    `Fetching ${totalCount} workouts with api token ${apiToken}`
  );
  const fetchResults: {cached: number, downloaded:number}[] = []

  let index = 0;
  for(const {workoutKey} of workoutList) {
    index++;
    const fetchResult = await fetchWorkouts(workoutKey, apiToken, index, totalCount)
    fetchResults.push(fetchResult)
  }

  const cached = fetchResults.reduce((prev, {cached}) => prev + cached, 0)
  const downloaded = fetchResults.reduce((prev, {downloaded}) => prev + downloaded, 0)
  console.log(
    `${downloaded} workouts download and ${cached} workout found from cache`
  );
};

const fetchWorkouts = async (
  workoutId: string,
  apiToken: string,
  current: number,
  totalCount: number
): Promise<{cached: number, downloaded:number}> => {
  const endpoint = getWorkoutEndpoint(workoutId, apiToken);
  const filename = getWorkoutRawDataFilename(workoutId);
  if (!fs.existsSync(filename)) {
    console.log(`Downloading workout ${current}/${totalCount}`);
    await downloadJson(filename, endpoint);
    return ({cached: 0, downloaded: 1})
  }
  return ({cached: 1, downloaded: 0})
};
