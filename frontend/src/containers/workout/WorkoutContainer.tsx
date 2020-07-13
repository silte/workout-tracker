import React, { useState, useEffect } from "react";
import { WORKOUT_DATA_ENDPOINT } from "../../constants/endpoints";
import { useParams } from "react-router-dom";
import { Workout } from "../../pages/workout/Workout";

export const WorkoutContainer = () => {
  const [workout, setWorkout] = useState<IWorkoutData>({} as IWorkoutData);
  const { workoutId } = useParams<{ workoutId: string }>();

  useEffect(() => {
    const fetchWorkout = async () => {
      const rawData = await fetch(WORKOUT_DATA_ENDPOINT + workoutId);
      const jsonData = await rawData.json();
      setWorkout(jsonData);
    };
    fetchWorkout();
  }, [workoutId]);

  return <Workout workout={workout} />;
};
