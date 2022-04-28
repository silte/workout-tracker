import mongoose, { Schema, Document } from "mongoose";
import { USER_MODEL_NAME } from "./user-model";

export const RAW_WORKOUT_SUMMARY_MODEL_NAME = "raw-workout-summary";
export interface IRawWorkoutSummaryModel extends Document, IRawWorkoutSummary {
  userId?: string;
}

const rawWorkoutSummarySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    default: null,
  },
  activityId: Number,
  startTime: Number,
  totalTime: Number,
  totalDistance: Number,
  totalAscent: Number,
  totalDescent: Number,
  startPosition: {
    x: Number,
    y: Number,
  },
  stopPosition: {
    x: Number,
    y: Number,
  },
  centerPosition: {
    x: Number,
    y: Number,
  },
  maxSpeed: Number,
  recoveryTime: Number,
  cumulativeRecoveryTime: Number,
  rankings: {
    max: Number,
    avg: Number,
  },
  extensions: [],
  extensionTypes: [{ type: String }],
  isEdited: Boolean,
  isManuallyAdded: Boolean,
  workoutKey: String,
  cadence: {},
  avgPace: Number,
  avgSpeed: Number,
  hrdata: {},
  energyConsumption: Number,
  commentCount: Number,
  pictureCount: Number,
  viewCount: Number,
  timeOffsetInMinutes: Number,
  externalBlobSourceRaw: {},
});

export default mongoose.model<IRawWorkoutSummaryModel>(
  RAW_WORKOUT_SUMMARY_MODEL_NAME,
  rawWorkoutSummarySchema
);
