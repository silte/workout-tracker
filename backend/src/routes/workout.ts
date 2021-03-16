import { Router, Request, Response } from "express";

import { getWorkoutList } from "../controllers/workout/getWorkoutList";
import { getWorkoutData } from "../controllers/workout/getWorkoutData";
import { updateUserWorkoutData } from "../integrations/suunto/updateUserWorkoutData";

const workoutRouter = Router();

workoutRouter.get(
  "/workout-list.json",
  (request: Request, response: Response) => {
    response.json(getWorkoutList());
  }
);

workoutRouter.get("/:workoutId", (request: Request, response: Response) => {
  const { workoutId } = request.params;
  response.json(getWorkoutData(workoutId));
});

workoutRouter.post("/update", (request: Request, response: Response) => {
  const { apiKey } = request.body;

  if (typeof apiKey !== "string") {
    response
      .status(400)
      .json({ status: 400, message: "apiKey parameter is required." });
    return;
  }

  setTimeout(updateUserWorkoutData, 1000, apiKey);

  response.json({ status: 200, message: "Updating workouts in background" });
});

export { workoutRouter };
