import { Router, Request, Response } from "express";
import { getUserWorkoutList, getWorkoutData } from "../controllers/workout";

const workoutRouter = Router();

workoutRouter.get("/workout-list.json", getUserWorkoutList);

workoutRouter.get("/:workoutId", (request: Request, response: Response) => {
  const { workoutId } = request.params;
  response.json(getWorkoutData(workoutId));
});

export default workoutRouter;
