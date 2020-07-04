import { Router, Request, Response } from "express";
import { getExerciseList } from "../controllers/exercise/getExerciseList";
import { getExerciseData } from "../controllers/exercise/getExerciseData";

const exerciseRouter = Router();

exerciseRouter.get("/list", (request: Request, response: Response) => {
  response.json(getExerciseList());
});

exerciseRouter.get("/:exerciseId", (request: Request, response: Response) => {
  const { exerciseId } = request.params;
  response.json(getExerciseData(exerciseId));
});

export { exerciseRouter };
