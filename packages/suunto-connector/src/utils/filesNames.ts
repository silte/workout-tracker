// @TODO

export const getWorkoutRawDataFilename = (workoutId: string): string => {
  const DATA_DIR = process.env.SUUNTO_DATA_DIR ?? './data';
  return `${DATA_DIR}/${workoutId}.json`;
};
