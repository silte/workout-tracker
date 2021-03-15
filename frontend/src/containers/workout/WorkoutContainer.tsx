import React, { useState, useEffect } from "react";
import { WORKOUT_DATA_ENDPOINT } from "../../constants/endpoints";
import { useHistory, useParams } from "react-router-dom";
import { Workout } from "../../pages/workout/Workout";

export const WorkoutContainer = () => {
  const [workout, setWorkout] = useState<IWorkoutData>({} as IWorkoutData);
  const { workoutId, chartEndIndex: defaultChartEndIndex, chartStartIndex: defaultChartStartIndex } = useParams<{ workoutId: string, chartStartIndex?: string, chartEndIndex?: string }>();

  const [chartStartIndex, setChartStartIndex] = useState<number>(typeof defaultChartStartIndex !== "undefined" ? parseInt(defaultChartStartIndex) : NaN);
  const [chartEndIndex, setChartEndIndex] = useState<number>(typeof defaultChartEndIndex !== "undefined" ? parseInt(defaultChartEndIndex) : NaN);

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
    if((!isNaN(chartStartIndex) && !isNaN(chartEndIndex)) && (chartStartIndex > 0 || chartEndIndex < workout.dataPoints?.length - 1)) {
      path = `/workout/${workoutId}/${chartStartIndex}/${chartEndIndex}`;
    }
    history.replace(path);
  }, [chartStartIndex, chartEndIndex, workoutId, history]);

  return <Workout workout={workout} chartStartIndex={chartStartIndex} chartEndIndex={chartEndIndex} setChartStartIndex={setChartStartIndex} setChartEndIndex={setChartEndIndex} />;
};