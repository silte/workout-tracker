import React, { useState, useEffect } from "react";
import { ExerciseSummary } from "../../pages/excercise/ExerciseSummary";
import { EXCERCISE_LIST_ENDPOINT } from "../../constants/endpoints";

export const ExerciseSummaryContainer = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState(null);
  const [filterEndDate, setFilterEndDate] = useState(null);

  useEffect(() => {
    const fetchExerciseList = async () => {
      const rawData = await fetch(EXCERCISE_LIST_ENDPOINT);
      const jsonData = await rawData.json();
      setExerciseList(jsonData);
    };
    fetchExerciseList();
  }, []);

  const filteredExerciseList = exerciseList.filter(
    ({ startTime }) =>
      (filterStartDate == null || filterStartDate < startTime) &&
      (filterEndDate == null || filterEndDate > startTime)
  );

  return (
    <ExerciseSummary
      exerciseList={filteredExerciseList}
      setFilterStartDate={setFilterStartDate}
      setFilterEndDate={setFilterEndDate}
    />
  );
};
