import { Response, Request } from "express";
import { IUserModel } from "../models/user-model";

export const getMyData = async (req: Request, res: Response): Promise<void> => {
  const getMyDataFilename = (): string => {
    const addLeadingZero = (number: number): string => `0${number}`.substr(-2);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `my-workout-tracker-data-${year}${addLeadingZero(
      month
    )}${addLeadingZero(day)}.json`;
  };
  const user = req.user as IUserModel;
  const data = JSON.stringify({ user });

  res.setHeader(
    "Content-disposition",
    `attachment; filename= ${getMyDataFilename()}`
  );
  res.setHeader("Content-type", "application/json");

  res.write(data, () => {
    res.end();
  });
};

export const overrideMyData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as IUserModel;

  if (!user.roles.includes("test-user")) {
    res.status(403).json({
      status: 403,
      errors: ["Only users with the test-user role can override account data."],
    });
    return;
  }

  res
    .status(201)
    .json({ status: 201, payload: "Successfully overrided data." });
};
