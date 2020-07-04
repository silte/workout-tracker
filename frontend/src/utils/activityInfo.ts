import activityInfoData from '../constants/activityTypes.json';

export const getActivityName = (activityId: number) =>
  (<any>activityInfoData).find((activityInfo: any) => activityInfo.STId === activityId).Name;
