import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { WORKOUT_DATA_ENDPOINT } from "../../constants/endpoints";
import Workout from "../../pages/workout/Workout";

const WorkoutContainer = (): JSX.Element => {
  const [workout, setWorkout] = useState<IWorkoutData>({} as IWorkoutData);
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
    typeof defaultChartStartIndex !== "undefined"
      ? parseInt(defaultChartStartIndex, 10)
      : NaN
  );
  const [chartEndIndex, setChartEndIndex] = useState<number>(
    typeof defaultChartEndIndex !== "undefined"
      ? parseInt(defaultChartEndIndex, 10)
      : NaN
  );

  let startIndexUpdateTimer: number;
  let endIndexUpdateTimer: number;

  const updateStartIndex = (index: number) => {
    clearTimeout(startIndexUpdateTimer);
    startIndexUpdateTimer = setTimeout(setChartStartIndex, 500, index);
  };
  const updateEndIndex = (index: number) => {
    clearTimeout(endIndexUpdateTimer);
    endIndexUpdateTimer = setTimeout(setChartEndIndex, 500, index);
  };

  const history = useHistory();

  useEffect(() => {
    const fetchWorkout = async () => {
      const rawData = await fetch(WORKOUT_DATA_ENDPOINT + workoutId);
      const jsonData = await rawData.json();
      setWorkout(jsonData);
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
