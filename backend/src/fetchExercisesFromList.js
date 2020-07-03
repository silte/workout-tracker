const fs = require("fs");
const https = require("https");

const { readJson, downloadJson } = require("./jsonHandler");

const { DATA_DIR, EXERCISE_LIST_FILENAME } = require("./filesNames");
const { getExerciseEndpoint } = require("./endpoints");

const FETCH_INTERVAL_MS = 1000;

const init = (apiToken) => {
  const exerciseListfileLocation = `${DATA_DIR}/${EXERCISE_LIST_FILENAME}`;
  if (!fs.existsSync(exerciseListfileLocation)) {
    console.log(
      "Excercise list is required before you can fetch excercises.\n"
    );
    process.exit();
  }

  const { payload: excerciseList } = readJson(exerciseListfileLocation);
  console.log(
    `Fetching ${excerciseList.length} excercises with api token ${apiToken}`
  );
  fetchExcercises(excerciseList, apiToken);
};

const fetchExcercises = (
  excerciseList,
  apiToken,
  iterator = 0,
  downloaded = 0,
  cached = 0
) => {
  let sleepTime = FETCH_INTERVAL_MS;
  const { workoutKey: excerciseId } = excerciseList[iterator];

  const endpoint = getExerciseEndpoint(excerciseId, apiToken);
  const filename = `${DATA_DIR}/${excerciseId}.json`;
  if (!fs.existsSync(filename)) {
    console.log(`Downloading exercise ${iterator + 1}/${excerciseList.length}`);
    downloadJson(filename, endpoint);
    downloaded++;
  } else {
    // console.log(`File "${filename}" already found, skip downloading`);
    sleepTime = 0;
    cached++;
  }

  iterator++;
  if (excerciseList.length > iterator) {
    setTimeout(
      fetchExcercises,
      sleepTime,
      excerciseList,
      apiToken,
      iterator,
      downloaded,
      cached
    );
  } else {
    console.log(
      `${downloaded} exercises download and ${cached} exercise found from cache`
    );
  }
};

module.exports = init;
