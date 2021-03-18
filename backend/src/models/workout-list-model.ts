import mongoose, { Schema, Document } from "mongoose";
import { USER_MODEL_NAME } from "./user-model";

export const WORKOUT_SUMMARY_MODEL_NAME = "workout-summary";
export interface IWorkoutSummaryModel extends Document, IWorkoutSummary {
  userId: string;
}

const workoutSummarySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    default: null,
  },
  activityId: Number,
  workoutKey: String,
  startTime: Number,
  totalTime: Number,
  totalDistance: Number,
  totalAscent: Number,
  totalDescent: Number,
  maxSpeed: Number,
  hrmax: Number,
  hravg: Number,
  avgSpeed: Number,
  avgCadence: Number,
  feeling: Number,
  energyConsumption: Number,
  hrIntensity: {
    zone1: {
      totalTime: Number,
      lowerLimit: Number,
    },
    zone2: {
      totalTime: Number,
      lowerLimit: Number,
    },
    zone3: {
      totalTime: Number,
      lowerLimit: Number,
    },
    zone4: {
      totalTime: Number,
      lowerLimit: Number,
    },
    zone5: {
      totalTime: Number,
      lowerLimit: Number,
    },
  },
  multisportSummary: [],
});

export default mongoose.model<IWorkoutSummaryModel>(
  WORKOUT_SUMMARY_MODEL_NAME,
  workoutSummarySchema
);
