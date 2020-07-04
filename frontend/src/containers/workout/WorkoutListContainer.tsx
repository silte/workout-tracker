import React, { useState, useEffect } from "react";
import { WorkoutList } from "../../pages/workout/WorkoutList";
import { WORKOUT_LIST_ENDPOINT } from "../../constants/endpoints";

export const WorkoutListContainer = () => {
  const [workoutList, setWorkoutList] = useState<IWorkoutSummaryData[]>([]);

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
