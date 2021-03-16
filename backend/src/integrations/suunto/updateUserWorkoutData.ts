import { buildWorkoutSummaryDataCache } from "../../cacheBuilder";
import { fetchWorkoutList } from "./fetchers/fetchWorkoutList";
import { fetchWorkoutsFromList } from "./fetchers/fetchWorkoutsFromList";

export const updateUserWorkoutData = async (
  apiToken: string
): Promise<void> => {
  await fetchWorkoutList(apiToken);
  await fetchWorkoutsFromList(apiToken);
  buildWorkoutSummaryDataCache();
};
