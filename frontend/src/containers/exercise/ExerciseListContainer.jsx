import React, { useState, useEffect } from 'react';
import { ExerciseList } from '../../pages/excercise/ExerciseList';
import { EXCERCISE_LIST_ENDPOINT } from '../../constants/endpoints';

export const ExerciseListContainer = () => {
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    const fetchExerciseList = async () => {
      const rawData = await fetch(EXCERCISE_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setExerciseList(jsonData);
    };
    fetchExerciseList();
  }, []);

  return <ExerciseList exerciseList={exerciseList} />;
};
