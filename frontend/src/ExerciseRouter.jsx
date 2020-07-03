import React from "react";
import { Route } from "react-router-dom";
import { ExerciseListContainer } from "./containers/exercise/ExerciseListContainer";
import { ExerciseSummaryContainer } from "./containers/exercise/ExerciseSummaryContainer";

export const ExerciseRouter = () => {
  <>
    <Route path="/exercise/list" component={ExerciseListContainer} />
    <Route path="/exercise/summary" component={ExerciseSummaryContainer} />
  </>;
};
