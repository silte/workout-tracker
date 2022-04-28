import fs from "fs";
import { getWorkoutRawDataFilename } from "../../../constants/filesNames";
import { downloadJson } from "../../../utils/jsonHelper";
import { getWorkoutEndpoint } from "../../../constants/endpoints";
import { findRawWorkoutSummariesByUser } from "../../../services/raw-workout-list-service";
import { expandSuuntoEventlog } from "../logSuuntoFetchEvent";

const fetchWorkouts = async (
  workoutId: string,
  apiToken: string,
  current: number,
  totalCount: number,
  userId: string
): Promise<{ cached: number; downloaded: number }> => {
  const endpoint = getWorkoutEndpoint(workoutId, apiToken);
  const filename = getWorkoutRawDataFilename(workoutId);
  if (!fs.existsSync(filename)) {
    await expandSuuntoEventlog(
      userId,
      `Downloading workout ${current}/${totalCount}`
    );
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
    await expandSuuntoEventlog(
      userId,
      "Workout list not found, cannot fetch workouts"
    );
    return;
  }

  const totalCount = workoutList.length;
  await expandSuuntoEventlog(
    userId,
    `Fetching ${totalCount} workouts`,
    `user ${apiToken}`
  );
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
      totalCount,
      userId
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

  await expandSuuntoEventlog(
    userId,
    `${totalDownloaded} workouts download and ${totalCached} workout found from cache`
  );
};

export default fetchWorkoutsFromList;
