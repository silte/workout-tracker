import React, { useState, useEffect } from 'react';
import { WorkoutSummary } from '../../pages/workout/WorkoutSummary';
import { EXCERCISE_LIST_ENDPOINT } from '../../constants/endpoints';

export const WorkoutSummaryContainer = () => {
  const [workoutList, setWorkoutList] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

  useEffect(() => {
    const fetchWorkoutList = async () => {
      const rawData = await fetch(EXCERCISE_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setWorkoutList(jsonData);
    };
    fetchWorkoutList();
  }, []);

  const filteredWorkoutList = workoutList.filter(
    ({ startTime }) =>
      (filterStartDate == null || filterStartDate < startTime) && (filterEndDate == null || filterEndDate > startTime),
  );

  return (
    <WorkoutSummary
      workoutList={filteredWorkoutList}
      setFilterStartDate={setFilterStartDate}
      setFilterEndDate={setFilterEndDate}
    />
  );
};
