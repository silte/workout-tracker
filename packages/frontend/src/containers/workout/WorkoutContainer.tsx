import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Workout from '../../pages/workout/Workout';
import {
  useWorkoutControllerGetSuuntoWorkoutQuery,
  WorkoutDto,
} from '../../redux/generated/api';

const WorkoutContainer = (): JSX.Element => {
  const {
    workoutId,
    chartEndIndex: defaultChartEndIndex,
    chartStartIndex: defaultChartStartIndex,
  } = useParams<{
    workoutId: string;
    chartStartIndex?: string;
    chartEndIndex?: string;
  }>();

  const { data: workout } = useWorkoutControllerGetSuuntoWorkoutQuery({
    workoutId: workoutId ?? '',
  });

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!workout) return;
    let path = `/workout/${workoutId}`;
    if (
      !Number.isNaN(chartStartIndex) &&
      !Number.isNaN(chartEndIndex) &&
      (chartStartIndex > 0 || chartEndIndex < workout.dataPoints?.length - 1)
    ) {
      path = `/workout/${workoutId}/${chartStartIndex}/${chartEndIndex}`;
    }
    navigate(path);
  }, [
    chartStartIndex,
    chartEndIndex,
    workoutId,
    workout?.dataPoints?.length,
    workout,
    navigate,
  ]);

  return (
    <Workout
      workout={workout ?? ({} as WorkoutDto)}
      chartStartIndex={chartStartIndex}
      chartEndIndex={chartEndIndex}
      setChartStartIndex={updateStartIndex}
      setChartEndIndex={updateEndIndex}
    />
  );
};

export default WorkoutContainer;
