import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Loader } from '../../components/loader/loader';
import { useFirstDayOfSeason } from '../../hooks/useFirstDayOfSeason';
import WorkoutSummary from '../../pages/workout/WorkoutSummary';
import {
  useWorkoutSummaryControllerFindAllQuery,
  WorkoutSummaryDto,
} from '../../redux/generated/api';
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
  }: WorkoutSummaryDto
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

const parseMultisportSummaryData = (workoutList: WorkoutSummaryDto[]) =>
  workoutList.reduce((previousValue: WorkoutSummaryDto[], currentValue) => {
    const multisportSummaries = currentValue.multisportSummary?.map(
      ({ duration, distance, ascent, activityId }) =>
        ({
          activityId,
          totalTime: duration,
          totalDistance: distance,
          totalAscent: ascent,
        } as WorkoutSummaryDto)
    );
    if (
      typeof multisportSummaries === 'undefined' ||
      multisportSummaries.length === 0
    ) {
      return previousValue.concat(currentValue);
    }
    multisportSummaries[0].hrIntensity = currentValue.hrIntensity;
    return previousValue.concat(multisportSummaries);
  }, [] as WorkoutSummaryDto[]);

const parseSummaryData = (
  workoutList: WorkoutSummaryDto[],
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
  const firstDayOfSeason = useFirstDayOfSeason();

  const { startDate = '', endDate } = useParams<{
    startDate: string;
    endDate: string;
  }>();
  const navigate = useNavigate();

  const { data: workoutList } = useWorkoutSummaryControllerFindAllQuery();

  const [isMultisportExposed, setIsMultisportExposed] =
    useState<boolean>(false);
  const [filterStartDate, setFilterStartDate] = useState<number>(NaN);
  const [filterEndDate, setFilterEndDate] = useState<number>(NaN);

  useEffect(() => {
    if (isNaN(filterEndDate) && endDate)
      setFilterEndDate(new Date(endDate).getTime() + 86399999);
    if (isNaN(filterStartDate) && startDate)
      setFilterStartDate(new Date(startDate).getTime());

    if (isNaN(filterStartDate) && firstDayOfSeason)
      setFilterStartDate(firstDayOfSeason.getTime());
  }, [endDate, filterEndDate, filterStartDate, firstDayOfSeason, startDate]);

  useEffect(() => {
    let path = '/workout/summary';
    const formattedStartDate = formatDateToISO8601(new Date(filterStartDate));
    const formattedEndDate = formatDateToISO8601(new Date(filterEndDate));

    if (!Number.isNaN(filterStartDate) && !Number.isNaN(filterEndDate)) {
      path = `${path}/${formattedStartDate}/${formattedEndDate}`;
    } else if (!Number.isNaN(filterStartDate)) {
      path = `${path}/${formattedStartDate}`;
    } else if (!Number.isNaN(filterEndDate)) {
      path = `${path}/-/${formattedEndDate}`;
    }
    navigate({ pathname: path });
  }, [filterEndDate, filterStartDate, navigate]);

  const filteredWorkoutList =
    workoutList?.filter(
      ({ startTime }) =>
        (Number.isNaN(filterStartDate) || filterStartDate < startTime) &&
        (Number.isNaN(filterEndDate) || filterEndDate > startTime)
    ) ?? [];

  const workoutSummaryData =
    filteredWorkoutList.length > 0
      ? parseSummaryData(filteredWorkoutList, isMultisportExposed)
      : [];

  if (!firstDayOfSeason) return <Loader />;

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
