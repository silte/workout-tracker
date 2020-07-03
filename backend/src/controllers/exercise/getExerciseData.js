const { readJson } = require("../../jsonHelper");
const { DATA_DIR } = require("../../filesNames");

const getExerciseList = (exerciseId) => {
  const filename = `${DATA_DIR}/${exerciseId}.json`;
  return readJson(filename);
};

module.exports = getExerciseList;
