const { readJson } = require("../../utils/jsonHelper");
const { EXERCISE_LIST_FILENAME } = require("../../constants/filesNames");

const getExerciseList = () => {
  const allExerciseListData = readJson(EXERCISE_LIST_FILENAME);
  return allExerciseListData.payload.map(filterExerciseListItemContent);
};

const filterExerciseListItemContent = ({
  activityId,
  startTime,
  totalTime,
  totalDistance,
  totalAscent,
  totalDescent,
  maxSpeed,
  extensions,
  hrdata,
  ...otherData
}) => {
  const summaryExtension =
    typeof extensions !== "undefined"
      ? extensions.find((extension) => extension.type === "SummaryExtension")
      : {};

  const { hrmax, avg: hravg } = typeof hrdata !== "undefined" ? hrdata : {};

  const { avgSpeed, avgCadence, feeling } =
    typeof summaryExtension !== "undefined" ? summaryExtension : {};

  return {
    activityId,
    startTime,
    totalTime,
    totalDistance,
    totalAscent,
    totalDescent,
    maxSpeed,
    hrmax,
    hravg,
    avgSpeed,
    avgCadence,
    feeling,
  };
};

module.exports = getExerciseList;
