const getExerciseListEndpoint = (apiToken) =>
  `https://api.sports-tracker.com/apiserver/v1/workouts?limited=true&limit=10000000&token=${apiToken}`;

const getExerciseEndpoint = (excerciseId, apiToken) =>
  `https://api.sports-tracker.com/apiserver/v1/workouts/${excerciseId}/combined?token=${apiToken}`;

module.exports = {
  getExerciseListEndpoint,
  getExerciseEndpoint,
};
