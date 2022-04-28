import fetch from "node-fetch";

import { getWorkoutListEndpoint } from "../../../constants/endpoints";
import {
  createRawWorkoutSummary,
  findRawWorkoutSummariesByUser,
} from "../../../services/raw-workout-list-service";
import { setSuuntoEventlog } from "../logSuuntoFetchEvent";

const fetchWorkoutList = async (
  apiToken: string,
  userId: string
): Promise<void> => {
  await setSuuntoEventlog(userId, `Fetching workout list`, `user ${userId}`);

  const endpoint = getWorkoutListEndpoint(apiToken);

  const workoutList: IRawWorkoutSummaryWrapper = await (
    await fetch(endpoint)
  ).json();
  const allCurrentRawSummaries = await findRawWorkoutSummariesByUser(userId);
  const allCurrentRawSummaryKeys = allCurrentRawSummaries?.map(
    ({ workoutKey }) => workoutKey
  );

  const missingRawSummaries = workoutList.payload.filter(
    ({ workoutKey }) => !allCurrentRawSummaryKeys?.includes(workoutKey)
  );

  await Promise.all(
    missingRawSummaries.map(async (rawSummarryData) =>
      createRawWorkoutSummary({ ...rawSummarryData, userId })
    )
  );
};

export default fetchWorkoutList;
