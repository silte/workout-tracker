const { readJson } = require("../../utils/jsonHelper");
const { DATA_DIR } = require("../../constants/filesNames");

const getExerciseList = (exerciseId) => {
  const filename = `${DATA_DIR}/${exerciseId}.json`;
  return readJson(filename);
};

module.exports = getExerciseList;
