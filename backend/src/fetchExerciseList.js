const fs = require("fs");

const { DATA_DIR, EXERCISE_LIST_FILENAME } = require("./filesNames");
const { getExerciseListEndpoint } = require("./endpoints");
const { downloadJson } = require("./jsonHelper");

const init = async (apiToken) => {
  console.log(`Fetching exercise list with api token: ${apiToken}`);
  ensureDataDirectoryExists();

  const endpoint = getExerciseListEndpoint(apiToken);
  await downloadJson(EXERCISE_LIST_FILENAME, endpoint);
};

const ensureDataDirectoryExists = () =>
  !fs.existsSync(DATA_DIR) && fs.mkdirSync(DATA_DIR);

module.exports = init;
