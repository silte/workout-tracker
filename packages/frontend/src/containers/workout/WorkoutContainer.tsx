import { WorkoutDto } from '@local/types';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Workout from '../../pages/workout/Workout';
import { getWorkoutById } from '../../services/workout-service';

const WorkoutContainer = (): JSX.Element => {
  const [workout, setWorkout] = useState<WorkoutDto>({} as WorkoutDto);
  const {
    workoutId,
    chartEndIndex: defaultChartEndIndex,
    chartStartIndex: defaultChartStartIndex,
  } = useParams<{
    workoutId: string;
    chartStartIndex?: string;
    chartEndIndex?: string;
  }>();

  const [chartStartIndex, setChartStartIndex] = useState<number>(
    typeof defaultChartStartIndex !== 'undefined'
      ? parseInt(defaultChartStartIndex, 10)
      : NaN
  );
  const [chartEndIndex, setChartEndIndex] = useState<number>(
    typeof defaultChartEndIndex !== 'undefined'
      ? parseInt(defaultChartEndIndex, 10)
      : NaN
  );

  let startIndexUpdateTimer: number;
  let endIndexUpdateTimer: number;

  const updateStartIndex = (index: number) => {
    clearTimeout(startIndexUpdateTimer);
    startIndexUpdateTimer = setTimeout(
      setChartStartIndex,
      500,
      index
    ) as unknown as number;
  };
  const updateEndIndex = (index: number) => {
    clearTimeout(endIndexUpdateTimer);
    endIndexUpdateTimer = setTimeout(
      setChartEndIndex,
      500,
      index
    ) as unknown as number;
  };

  const history = useHistory();

  useEffect(() => {
    const fetchWorkout = async () => {
      setWorkout(await getWorkoutById(workoutId));
    };
    fetchWorkout();
  }, [workoutId]);

  useEffect(() => {
    let path = `/workout/${workoutId}`;
    if (
      !Number.isNaN(chartStartIndex) &&
      !Number.isNaN(chartEndIndex) &&
      (chartStartIndex > 0 || chartEndIndex < workout.dataPoints?.length - 1)
    ) {
      path = `/workout/${workoutId}/${chartStartIndex}/${chartEndIndex}`;
    }
    history.replace(path);
  }, [
    chartStartIndex,
    chartEndIndex,
    workoutId,
    history,
    workout.dataPoints?.length,
  ]);

  return (
    <Workout
      workout={workout}
      chartStartIndex={chartStartIndex}
      chartEndIndex={chartEndIndex}
      setChartStartIndex={updateStartIndex}
      setChartEndIndex={updateEndIndex}
    />
  );
};

export default WorkoutContainer;
