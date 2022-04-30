import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { WORKOUT_LIST_ENDPOINT } from '../../constants/endpoints';
import WorkoutSummary from '../../pages/workout/WorkoutSummary';
import { sumNumbers } from '../../utils/numberOperations';
import { formatDateToISO8601 } from '../../utils/timeConverter';

const sumSummaryDataAndWorkoutSummaryData = (
  summaryData: ISummaryData | undefined,
  {
    activityId: newActivityId,
    totalTime: newTime,
    totalAscent: newAscent,
    totalDistance: newDistance,
    hrIntensity: newHrIntensity,
  }: IWorkoutSummary
): ISummaryData => ({
  activityId: newActivityId,
  totalDistance: sumNumbers(summaryData?.totalDistance, newDistance),
  totalDuration: sumNumbers(summaryData?.totalDuration, newTime),
  totalAscent: sumNumbers(summaryData?.totalAscent, newAscent),
  hrIntensity: {
    zone1: sumNumbers(
      summaryData?.hrIntensity?.zone1,
      newHrIntensity?.zone1?.totalTime
    ),
    zone2: sumNumbers(
      summaryData?.hrIntensity?.zone2,
      newHrIntensity?.zone2?.totalTime
    ),
    zone3: sumNumbers(
      summaryData?.hrIntensity?.zone3,
      newHrIntensity?.zone3?.totalTime
    ),
    zone4: sumNumbers(
      summaryData?.hrIntensity?.zone4,
      newHrIntensity?.zone4?.totalTime
    ),
    zone5: sumNumbers(
      summaryData?.hrIntensity?.zone5,
      newHrIntensity?.zone5?.totalTime
    ),
  },
});

const parseMultisportSummaryData = (workoutList: IWorkoutSummary[]) =>
  workoutList.reduce((previousValue: IWorkoutSummary[], currentValue) => {
    const multisportSummaries = currentValue.multisportSummary?.map(
      ({ duration, distance, ascent, activityId }) =>
        ({
          activityId,
          totalTime: duration,
          totalDistance: distance,
          totalAscent: ascent,
        } as IWorkoutSummary)
    );
    if (
      typeof multisportSummaries === 'undefined' ||
      multisportSummaries.length === 0
    ) {
      return previousValue.concat(currentValue);
    }
    multisportSummaries[0].hrIntensity = currentValue.hrIntensity;
    return previousValue.concat(multisportSummaries);
  }, [] as IWorkoutSummary[]);

const parseSummaryData = (
  workoutList: IWorkoutSummary[],
  isMultisportExposed: boolean
) => {
  const parsedWorkoutList = !isMultisportExposed
    ? workoutList
    : parseMultisportSummaryData(workoutList);

  return parsedWorkoutList
    .reduce((previousValue: ISummaryData[], currentValue) => {
      const currentActivityId = currentValue.activityId;
      const currentSummary = previousValue.find(
        ({ activityId }) => activityId === currentActivityId
      );
      const currentActivityNewSummary = sumSummaryDataAndWorkoutSummaryData(
        currentSummary,
        currentValue
      );
      return [
        ...previousValue.filter(
          ({ activityId }) => activityId !== currentActivityId
        ),
        {
          ...currentActivityNewSummary,
        },
      ];
    }, [])
    .sort((a, b) => (a.totalDuration > b.totalDuration ? -1 : 1));
};

const WorkoutSummaryContainer = (): JSX.Element => {
  const { startDate, endDate } = useParams<{
    startDate: string;
    endDate: string;
  }>();
  const history = useHistory();

  const [workoutList, setWorkoutList] = useState<IWorkoutSummary[]>([]);
  const [isMultisportExposed, setIsMultisportExposed] =
    useState<boolean>(false);
  const [filterStartDate, setFilterStartDate] = useState<number>(
    new Date(startDate).getTime()
  );
  const [filterEndDate, setFilterEndDate] = useState<number>(
    typeof endDate !== 'undefined'
      ? new Date(endDate).getTime() + 86399999
      : NaN
  );

  useEffect(() => {
    const fetchWorkoutList = async () => {
      const rawData = await fetch(WORKOUT_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setWorkoutList(jsonData);
    };
    fetchWorkoutList();
  }, []);

  useEffect(() => {
    let path = '/workout/summary';
    if (!Number.isNaN(filterStartDate) && !Number.isNaN(filterEndDate)) {
      const formattedStartDate = formatDateToISO8601(new Date(filterStartDate));
      const formattedEndDate = formatDateToISO8601(new Date(filterEndDate));
      path = `${path}/${formattedStartDate}/${formattedEndDate}`;
    } else if (!Number.isNaN(filterStartDate)) {
      const formattedStartDate = formatDateToISO8601(new Date(filterStartDate));
      path = `${path}/${formattedStartDate}`;
    } else if (!Number.isNaN(filterEndDate)) {
      const formattedEndDate = formatDateToISO8601(new Date(filterEndDate));
      path = `${path}/-/${formattedEndDate}`;
    }
    history.replace({ pathname: path });
  }, [filterEndDate, filterStartDate, history]);

  const filteredWorkoutList = workoutList.filter(
    ({ startTime }) =>
      (Number.isNaN(filterStartDate) || filterStartDate < startTime) &&
      (Number.isNaN(filterEndDate) || filterEndDate > startTime)
  );

  const workoutSummaryData =
    filteredWorkoutList.length > 0
      ? parseSummaryData(filteredWorkoutList, isMultisportExposed)
      : [];

  return (
    <WorkoutSummary
      workoutList={filteredWorkoutList}
      workoutSummaryData={workoutSummaryData}
      filterStartDate={filterStartDate}
      filterEndDate={filterEndDate}
      setFilterStartDate={setFilterStartDate}
      setFilterEndDate={setFilterEndDate}
      setIsMultisportExposed={setIsMultisportExposed}
      isMultisportExposed={isMultisportExposed}
    />
  );
};

export default WorkoutSummaryContainer;
