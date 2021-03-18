import buildWorkoutSummaryDataCache from "../../cacheBuilder";
import {
  findSuuntoApiInfoByUser,
  setIsFetching,
} from "../../services/suunto-api-info-service";
import fetchWorkoutList from "./fetchers/fetchWorkoutList";
import fetchWorkoutsFromList from "./fetchers/fetchWorkoutsFromList";
import { expandSuuntoEventlog } from "./logSuuntoFetchEvent";

const markFetchStarted = async (userId: string) => setIsFetching(userId, true);
const markFetchFinished = async (userId: string) =>
  setIsFetching(userId, false);

const updateUserWorkoutData = async (userId: string): Promise<void> => {
  const suuntoApiInfos = await findSuuntoApiInfoByUser(userId);
  if (!suuntoApiInfos) {
    return;
  }
  const [{ apiToken }] = suuntoApiInfos;

  if (!apiToken) {
    return;
  }

  try {
    await markFetchStarted(userId);

    await fetchWorkoutList(apiToken, userId);
    await fetchWorkoutsFromList(apiToken, userId);
    await buildWorkoutSummaryDataCache(userId);
  } catch (e) {
    await expandSuuntoEventlog(userId, "ERROR: Failed to fetch workouts", e);
  } finally {
    await markFetchFinished(userId);
  }
};

export default updateUserWorkoutData;
