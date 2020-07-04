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

  return (
    <WorkoutSummary
      workoutList={filteredWorkoutList}
      setFilterStartDate={setFilterStartDate}
      setFilterEndDate={setFilterEndDate}
    />
  );
};
