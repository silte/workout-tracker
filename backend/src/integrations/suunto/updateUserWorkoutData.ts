import buildWorkoutSummaryDataCache from "../../cacheBuilder";
import fetchWorkoutList from "./fetchers/fetchWorkoutList";
import fetchWorkoutsFromList from "./fetchers/fetchWorkoutsFromList";

const updateUserWorkoutData = async (
  apiToken: string,
  userId: string
): Promise<void> => {
  await fetchWorkoutList(apiToken, userId);
  await fetchWorkoutsFromList(apiToken, userId);
  await buildWorkoutSummaryDataCache(userId);
};

export default updateUserWorkoutData;
