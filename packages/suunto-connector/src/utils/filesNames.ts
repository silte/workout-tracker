// @TODO

export const DATA_DIR = './data';
export const CACHE_DIR = './cache';
export const WORKOUT_LIST_RAW_FILENAME = `${DATA_DIR}/workout-list.json`;
export const WORKOUT_LIST_FILENAME = `${CACHE_DIR}/workout-list.json`;
export const REACT_APP_PATH = '/static/react-app/';

export const getWorkoutRawDataFilename = (workoutId: string): string =>
  `${DATA_DIR}/${workoutId}.json`;

export const getWorkoutDataFilename = (workoutId: string): string =>
  `${CACHE_DIR}/${workoutId}.json`;
