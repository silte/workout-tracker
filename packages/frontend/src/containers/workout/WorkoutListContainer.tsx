import React, { useState, useEffect } from 'react';

import { WORKOUT_LIST_ENDPOINT } from '../../constants/endpoints';
import WorkoutList from '../../pages/workout/WorkoutList';

const WorkoutListContainer = (): JSX.Element => {
  const [workoutList, setWorkoutList] = useState<IWorkoutSummary[]>([]);

  useEffect(() => {
    const fetchWorkoutList = async () => {
      const rawData = await fetch(WORKOUT_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setWorkoutList(jsonData);
    };
    fetchWorkoutList();
  }, []);

  return <WorkoutList workoutList={workoutList} />;
};

export default WorkoutListContainer;
