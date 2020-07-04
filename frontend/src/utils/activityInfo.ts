import activityInfoData from '../constants/activityTypes.json';

export const getActivityName = (activityId: number) =>
  (activityInfoData as any).find((activityInfo: any) => activityInfo.STId === activityId).Name;
