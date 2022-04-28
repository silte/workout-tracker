import mongoose, { Schema, Document } from "mongoose";
import { USER_MODEL_NAME } from "./user-model";

export const SUUNTO_API_INFO_MODEL_NAME = "suunto-api-info";
export interface ISuuntoApiInfoModel extends Document, ISuuntoApiInfo {
  userId: string;
}

const suuntoApiInfoSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_MODEL_NAME,
    unique: true,
    index: true,
    required: true,
  },
  apiToken: String,
  previousFetchTime: Number,
  isFetching: Boolean,
  fetchMessage: [{ type: String }],
});

export default mongoose.model<ISuuntoApiInfoModel>(
  SUUNTO_API_INFO_MODEL_NAME,
  suuntoApiInfoSchema
);
