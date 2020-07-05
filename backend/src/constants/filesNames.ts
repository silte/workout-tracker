export const DATA_DIR: string = "./data";
export const WORKOUT_LIST_FILENAME: string = `${DATA_DIR}/workout-list.json`;

export const getWorkoutRawDataFilename = (workoutId: string) =>
  `${DATA_DIR}/${workoutId}.json`;
