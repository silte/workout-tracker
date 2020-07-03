const router = require("express").Router();

const getExerciseList = require("../controllers/exercise/getExerciseList");
const getExerciseData = require("../controllers/exercise/getExerciseData");

router.get("/list", (request, response) => {
  response.json(getExerciseList());
});

router.get("/:exerciseId", (request, response) => {
  const { exerciseId } = request.params;
  response.json(getExerciseData(exerciseId));
});

module.exports = router;
