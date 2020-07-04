import { Router, Request, Response } from "express";

import { getWorkoutList } from "../controllers/workout/getWorkoutList";
import { getWorkoutData } from "../controllers/workout/getWorkoutData";

const workoutRouter = Router();

workoutRouter.get("/list", (request: Request, response: Response) => {
  response.json(getWorkoutList());
});

workoutRouter.get("/:workoutId", (request: Request, response: Response) => {
  const { workoutId } = request.params;
  response.json(getWorkoutData(workoutId));
});

export { workoutRouter };
