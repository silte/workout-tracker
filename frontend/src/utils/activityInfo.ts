import activityInfoData from "../constants/activityTypes.json";

export const getActivityName = (activityId: number) => {
  const activityInfo = getActivity(activityId);

  return typeof activityInfo !== "undefined"
    ? activityInfo.Name
    : "unknown activity";
};

const getActivity = (activityId: number) =>
  (activityInfoData as IActivityInfo[]).find(
    (activityInfo) => activityInfo.STId === activityId
  );
