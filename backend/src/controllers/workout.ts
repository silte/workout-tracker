import { Response, Request } from "express";

import { DATA_DIR } from "../constants/filesNames";
import { getSummaryExtension } from "../model/getWorkoutExtension";
import { IUserModel } from "../models/user-model";
import { findWorkoutSummariesByUser } from "../services/workout-list-service";
import { readJson } from "../utils/jsonHelper";
import {
  parseDataPoints,
  roundToSingleDecimal,
} from "./workout/getWorkoutData";

export const getUserWorkoutList = async (
  request: Request,
  response: Response
): Promise<void> => {
  const user = request.user as IUserModel;

  const workoutSummaries = await findWorkoutSummariesByUser(user.id);
  response.json(workoutSummaries || []);
};

export const getWorkoutData = (workoutId: string): IWorkoutData => {
  const filename = `${DATA_DIR}/${workoutId}.json`;
  const { payload: workoutData } = <IWorkoutRawDataContainer>readJson(filename);
  const {
    activityId,
    startTime,
    totalAscent,
    totalDescent,
    totalDistance,
    totalTime,
    centerPosition,
    startPosition,
    stopPosition,
    maxSpeed,
    maxAltitude,
    minAltitude,
    workoutKey,
  } = workoutData;
  const cadenceExtension = getSummaryExtension(workoutData);

  const dataPoints = parseDataPoints(workoutData);

  return {
    workoutKey,
    activityId,
    startTime,
    totalAscent,
    totalDescent,
    totalDistance,
    totalTime,
    centerPosition,
    startPosition,
    stopPosition,
    maxSpeed: roundToSingleDecimal(maxSpeed * 3.6),
    maxAltitude,
    minAltitude,
    avgCadence: cadenceExtension?.avgCadence,
    maxCadence: cadenceExtension?.maxCadence,
    dataPoints,
  };
};
