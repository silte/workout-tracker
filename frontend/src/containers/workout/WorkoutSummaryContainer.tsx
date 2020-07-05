import React, { useState, useEffect } from "react";
import { WorkoutSummary } from "../../pages/workout/WorkoutSummary";
import { WORKOUT_LIST_ENDPOINT } from "../../constants/endpoints";

export const WorkoutSummaryContainer = () => {
  const [workoutList, setWorkoutList] = useState<IWorkoutSummaryData[]>([]);
  const [filterStartDate, setFilterStartDate] = useState<number>(NaN);
  const [filterEndDate, setFilterEndDate] = useState<number>(NaN);

  useEffect(() => {
    const fetchWorkoutList = async () => {
      const rawData = await fetch(WORKOUT_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setWorkoutList(jsonData);
    };
    fetchWorkoutList();
  }, []);

  const filteredWorkoutList = workoutList.filter(
    ({ startTime }) =>
      (isNaN(filterStartDate) || filterStartDate < startTime) &&
      (isNaN(filterEndDate) || filterEndDate > startTime)
  );

  const workoutSummaryData =
    filteredWorkoutList.length > 0 ? parseSummaryData(filteredWorkoutList) : [];

  return (
    <WorkoutSummary
      workoutList={filteredWorkoutList}
      workoutSummaryData={workoutSummaryData}
      setFilterStartDate={setFilterStartDate}
      setFilterEndDate={setFilterEndDate}
    />
  );
};

const parseSummaryData = (workoutList: IWorkoutSummaryData[]) =>
  workoutList
    .reduce(
      (
        previousValue: ISummaryData[],
        {
          activityId: currentActivityId,
          totalTime: currentTime,
          totalDistance: currentDistance,
          totalAscent: currentAscent,
        }
      ) => {
        const currentActivitySummary = previousValue.find(
          ({ activityId }) => activityId === currentActivityId
        );

        const currectActivityTotal = {
          activityId: currentActivityId,
          totalDistance:
            typeof currentActivitySummary !== "undefined"
              ? currentActivitySummary.totalDistance + currentDistance
              : currentDistance,
          totalDuration:
            typeof currentActivitySummary !== "undefined"
              ? currentActivitySummary.totalDuration + currentTime
              : currentTime,
          totalAscent:
            typeof currentActivitySummary !== "undefined"
              ? currentActivitySummary.totalAscent + currentAscent
              : currentAscent,
        };

        return [
          ...previousValue.filter(
            ({ activityId }) => activityId !== currentActivityId
          ),
          { ...currectActivityTotal },
        ];
      },
      [] as ISummaryData[]
    )
    .sort((a, b) => (a.totalDuration > b.totalDuration ? -1 : 1));
