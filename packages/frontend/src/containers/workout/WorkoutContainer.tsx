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
    chartStartIndex: defaultChartStartIndex,
    chartEndIndex: defaultChartEndIndex,
  } = useParams<{
    workoutId: string;
    chartStartIndex?: string;
    chartEndIndex?: string;
  }>();

  const { data: workout } = useWorkoutControllerGetSuuntoWorkoutQuery({
    workoutId: workoutId ?? '',
  });

  const [chartStartIndex, setChartStartIndex] = useState<number>(
    defaultChartStartIndex ? parseInt(defaultChartStartIndex, 10) : NaN
  );
  const [chartEndIndex, setChartEndIndex] = useState<number>(
    defaultChartEndIndex ? parseInt(defaultChartEndIndex, 10) : NaN
  );

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
      setChartStartIndex={setChartStartIndex}
      setChartEndIndex={setChartEndIndex}
    />
  );
};

export default WorkoutContainer;
