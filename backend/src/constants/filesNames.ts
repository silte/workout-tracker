export const DATA_DIR: string = "./data";
export const CACHE_DIR: string = "./cache";
export const WORKOUT_LIST_RAW_FILENAME: string = `${DATA_DIR}/workout-list.json`;
export const WORKOUT_LIST_FILENAME: string = `${CACHE_DIR}/workout-list.json`;

export const getWorkoutRawDataFilename = (workoutId: string) =>
  `${DATA_DIR}/${workoutId}.json`;

export const getWorkoutDataFilename = (workoutId: string) =>
  `${CACHE_DIR}/${workoutId}.json`;
