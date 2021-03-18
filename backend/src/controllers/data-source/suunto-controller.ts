import { Response, Request } from "express";
import updateUserWorkoutData from "../../integrations/suunto/updateUserWorkoutData";
import { IUserModel } from "../../models/user-model";
import {
  createSuuntoApiInfo,
  findSuuntoApiInfoByUser,
} from "../../services/suunto-api-info-service";

export const getSuuntoApiInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUserModel;

  const suuntoApiInfos = await findSuuntoApiInfoByUser(user.id);
  if (suuntoApiInfos && suuntoApiInfos.length > 0) {
    res.status(200).json({ status: 200, payload: suuntoApiInfos[0] });
    return;
  }

  res.status(404).json({
    status: 404,
    errors: ["No suunto api info found for current user."],
  });
};

export const setSuuntoToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUserModel;

  const { apiToken }: { apiToken: string | undefined } = req.body;

  const parsedApiToken = apiToken && apiToken?.length > 0 ? apiToken : null;

  const suuntoApiInfos = await findSuuntoApiInfoByUser(user.id);

  if (suuntoApiInfos && suuntoApiInfos.length > 0) {
    const suuntoApiInfo = suuntoApiInfos[0];
    suuntoApiInfo.apiToken = parsedApiToken;
    suuntoApiInfo.save();
    res.status(200).json({ status: 200, payload: suuntoApiInfo });
    return;
  }

  const suuntoApiInfo = await createSuuntoApiInfo({
    userId: user.id,
    apiToken: parsedApiToken,
  });

  res.status(201).json({
    status: 201,
    payload: suuntoApiInfo,
  });
};

export const updateDataFromSuunto = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUserModel;
  const suuntoApiInfos = await findSuuntoApiInfoByUser(user.id);
  if (!suuntoApiInfos || suuntoApiInfos.length === 0) {
    res.status(400).json({
      status: 400,
      errors: [
        "Failed to start Suunto data update.",
        "No suunto api info found for current user.",
      ],
    });
    return;
  }

  const suuntoApiInfo = suuntoApiInfos[0];
  if (!suuntoApiInfo.apiToken || suuntoApiInfo.apiToken.length === 0) {
    res.status(400).json({
      status: 400,
      errors: [
        "Failed to start Suunto data update.",
        "Suunto API token is required to updata data",
      ],
    });
  }

  setTimeout(updateUserWorkoutData, 1000, user.id);

  res.json({ status: 200, payload: "Updating workouts in background" });
};
