import activityInfoData from '../constants/activityTypes.json';

const getActivity = (activityId: number) =>
  (activityInfoData as IActivityInfo[]).find(
    (activityInfo) => activityInfo.STId === activityId
  );

const getActivityName = (activityId: number): string => {
  const activityInfo = getActivity(activityId);

  return typeof activityInfo !== 'undefined'
    ? activityInfo.Name
    : 'unknown activity';
};

export default getActivityName;
