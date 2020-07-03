import activityInfoData from "../constants/activityTypes.json";

export const getActivityName = (activityId) =>
  activityInfoData.find((activityInfo) => activityInfo.STId === activityId)
    .Name;
