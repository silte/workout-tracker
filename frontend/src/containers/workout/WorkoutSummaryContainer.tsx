import React, { useState, useEffect } from "react";
import { WorkoutSummary } from "../../pages/workout/WorkoutSummary";
import { WORKOUT_LIST_ENDPOINT } from "../../constants/endpoints";
import { useParams, useHistory } from "react-router-dom";
import { formatDateToISO8601 } from "../../utils/timeConverter";

export const WorkoutSummaryContainer = () => {
  const { startDate, endDate } = useParams<{
    startDate: string;
    endDate: string;
  }>();
  const history = useHistory();

  const [workoutList, setWorkoutList] = useState<IWorkoutSummaryData[]>([]);
  const [isMultisportExposed, setIsMultisportExposed] = useState<boolean>(
    false
  );
  const [filterStartDate, setFilterStartDate] = useState<number>(
    new Date(startDate).getTime()
  );
  const [filterEndDate, setFilterEndDate] = useState<number>(
    new Date(endDate).getTime()
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
    let path = "/workout/summary";
    if (!isNaN(filterStartDate) && !isNaN(filterEndDate)) {
      const startDate = formatDateToISO8601(new Date(filterStartDate));
      const endDate = formatDateToISO8601(new Date(filterEndDate));
      path = `${path}/${startDate}/${endDate}`;
    } else if (!isNaN(filterStartDate)) {
      const startDate = formatDateToISO8601(new Date(filterStartDate));
      path = `${path}/${startDate}`;
    } else if (!isNaN(filterEndDate)) {
      const endDate = formatDateToISO8601(new Date(filterEndDate));
      path = `${path}/-/${endDate}`;
    }
    history.replace({ pathname: path });
  }, [filterEndDate, filterStartDate, history]);

  const filteredWorkoutList = workoutList.filter(
    ({ startTime }) =>
      (isNaN(filterStartDate) || filterStartDate < startTime) &&
      (isNaN(filterEndDate) || filterEndDate > startTime)
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

const parseMultisportSummaryData = (workoutList: IWorkoutSummaryData[]) =>
  workoutList.reduce((previousValue: IWorkoutSummaryData[], currentValue) => {
    const multisportSummaries = currentValue.multisportSummary?.map(
      ({ duration, distance, ascent, activityId }) =>
        ({
          activityId,
          totalTime: duration,
          totalDistance: distance,
          totalAscent: ascent,
        } as IWorkoutSummaryData)
    );

    return typeof multisportSummaries !== "undefined" &&
      multisportSummaries.length > 0
      ? previousValue.concat(multisportSummaries)
      : previousValue.concat(currentValue);
  }, [] as IWorkoutSummaryData[]);

const parseSummaryData = (
  workoutList: IWorkoutSummaryData[],
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

const sumSummaryDataAndWorkoutSummaryData = (
  summaryData: ISummaryData | undefined,
  {
    activityId: newActivityId,
    totalTime: newTime,
    totalAscent: newAscent,
    totalDistance: newDistance,
  }: IWorkoutSummaryData
): ISummaryData => ({
  activityId: newActivityId,
  totalDistance:
    typeof summaryData !== "undefined"
      ? summaryData.totalDistance + newDistance
      : newDistance,
  totalDuration:
    typeof summaryData !== "undefined"
      ? summaryData.totalDuration + newTime
      : newTime,
  totalAscent:
    typeof summaryData !== "undefined"
      ? summaryData.totalAscent + newAscent
      : newAscent,
});
