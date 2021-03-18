import fs from "fs";
import { getWorkoutRawDataFilename } from "../../../constants/filesNames";
import { downloadJson } from "../../../utils/jsonHelper";
import { getWorkoutEndpoint } from "../../../constants/endpoints";
import { findRawWorkoutSummariesByUser } from "../../../services/raw-workout-list-service";

const fetchWorkouts = async (
  workoutId: string,
  apiToken: string,
  current: number,
  totalCount: number
): Promise<{ cached: number; downloaded: number }> => {
  const endpoint = getWorkoutEndpoint(workoutId, apiToken);
  const filename = getWorkoutRawDataFilename(workoutId);
  if (!fs.existsSync(filename)) {
    // eslint-disable-next-line no-console
    console.log(`Downloading workout ${current}/${totalCount}`);
    await downloadJson(filename, endpoint);
    return { cached: 0, downloaded: 1 };
  }
  return { cached: 1, downloaded: 0 };
};

const fetchWorkoutsFromList = async (
  apiToken: string,
  userId: string
): Promise<void> => {
  const workoutList = await findRawWorkoutSummariesByUser(userId);

  if (workoutList === null) {
    // eslint-disable-next-line no-console
    console.log("Workout list not found, cannot fetch workouts");
    return;
  }

  const totalCount = workoutList.length;
  // eslint-disable-next-line no-console
  console.log(`Fetching ${totalCount} workouts with api token ${apiToken}`);
  const fetchResults: { cached: number; downloaded: number }[] = [];

  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const { workoutKey } of workoutList) {
    index += 1;
    // eslint-disable-next-line no-await-in-loop
    const fetchResult = await fetchWorkouts(
      workoutKey,
      apiToken,
      index,
      totalCount
    );
    fetchResults.push(fetchResult);
  }

  const totalCached = fetchResults.reduce(
    (prev, { cached }) => prev + cached,
    0
  );
  const totalDownloaded = fetchResults.reduce(
    (prev, { downloaded }) => prev + downloaded,
    0
  );
  // eslint-disable-next-line no-console
  console.log(
    `${totalDownloaded} workouts download and ${totalCached} workout found from cache`
  );
};

export default fetchWorkoutsFromList;
