// @ts-nocheck

import suuntoApiInfoModel, {
  ISuuntoApiInfoModel,
} from "../models/suunto-api-info-model";

type IUpdateDB = { ok: number; n: number; nModified: number };

export const findSuuntoApiInfoByUser = async (
  userId: string
): Promise<ISuuntoApiInfoModel[] | null> => suuntoApiInfoModel.find({ userId });

export const createSuuntoApiInfo = async (
  workoutSummary: ISuuntoApiInfoModel | ISuuntoApiInfo
): Promise<ISuuntoApiInfoModel | null> =>
  suuntoApiInfoModel.create(workoutSummary);

export const addFetchMessageRow = async (
  userId: string,
  message: string
): Promise<IUpdateDB | null> =>
  suuntoApiInfoModel.updateOne(
    { userId },
    { $push: { fetchMessage: message } }
  );

export const setFetchMessage = async (
  userId: string,
  message: string
): Promise<IUpdateDB | null> =>
  suuntoApiInfoModel.updateOne(
    { userId },
    { $set: { fetchMessage: [message] } }
  );

export const setIsFetching = async (
  userId: string,
  isFetching: boolean
): Promise<IUpdateDB | null> =>
  suuntoApiInfoModel.updateOne({ userId }, { $set: { isFetching } });
