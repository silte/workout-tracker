export const getExerciseListEndpoint = (apiToken: string) =>
  `https://api.sports-tracker.com/apiserver/v1/workouts?limited=true&limit=10000000&token=${apiToken}`;

export const getExerciseEndpoint = (excerciseId: string, apiToken: string) =>
  `https://api.sports-tracker.com/apiserver/v1/workouts/${excerciseId}/combined?token=${apiToken}`;
