import { Router, Request, Response } from "express";
import { getUserWorkoutList, getWorkoutData } from "../controllers/workout";

import updateUserWorkoutData from "../integrations/suunto/updateUserWorkoutData";
import { IUserModel } from "../models/user-model";

const workoutRouter = Router();

workoutRouter.get("/workout-list.json", getUserWorkoutList);

workoutRouter.get("/:workoutId", (request: Request, response: Response) => {
  const { workoutId } = request.params;
  response.json(getWorkoutData(workoutId));
});

workoutRouter.post("/update", (request: Request, response: Response) => {
  const user = request.user as IUserModel;
  const { apiKey } = request.body;

  if (typeof apiKey !== "string") {
    response
      .status(400)
      .json({ status: 400, message: "apiKey parameter is required." });
    return;
  }

  setTimeout(updateUserWorkoutData, 1000, apiKey, user.id);

  response.json({ status: 200, message: "Updating workouts in background" });
});

export default workoutRouter;
