import { WorkoutDto, WorkoutSummaryDto } from '@local/types';

import {
  WORKOUT_DATA_ENDPOINT,
  WORKOUT_LIST_ENDPOINT,
} from '../constants/endpoints';
import { parseJsonOrThrowError } from '../utils/apiHelper';

export const getWorkoutById = async (
  workoutId: string
): Promise<WorkoutDto> => {
  const rawData = await fetch(WORKOUT_DATA_ENDPOINT + workoutId);
  return parseJsonOrThrowError(rawData);
};

export const getWorkoutSummaries = async (): Promise<WorkoutSummaryDto[]> => {
  const rawData = await fetch(WORKOUT_LIST_ENDPOINT);
  return parseJsonOrThrowError(rawData);
};
