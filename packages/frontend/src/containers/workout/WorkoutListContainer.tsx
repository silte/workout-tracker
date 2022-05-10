import { WorkoutSummaryDto } from '@local/types';
import { useState, useEffect } from 'react';

import WorkoutList from '../../pages/workout/WorkoutList';
import { getWorkoutSummaries } from '../../services/workout-service';

const WorkoutListContainer = (): JSX.Element => {
  const [workoutList, setWorkoutList] = useState<WorkoutSummaryDto[]>([]);

  useEffect(() => {
    const fetchWorkoutList = async () => {
      setWorkoutList(await getWorkoutSummaries());
    };
    fetchWorkoutList();
  }, []);

  return <WorkoutList workoutList={workoutList} />;
};

export default WorkoutListContainer;
