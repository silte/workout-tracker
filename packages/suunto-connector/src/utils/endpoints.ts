export const getWorkoutListEndpoint = (apiToken: string): string =>
  `https://api.sports-tracker.com/apiserver/v1/workouts?limited=true&limit=10000000&token=${apiToken}`;

export const getWorkoutEndpoint = (
  workoutId: string,
  apiToken: string,
): string =>
  `https://api.sports-tracker.com/apiserver/v1/workouts/${workoutId}/combined?token=${apiToken}`;
