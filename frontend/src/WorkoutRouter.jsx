import React from "react";
import { Route } from "react-router-dom";
import { WorkoutListContainer } from "./containers/workout/WorkoutListContainer";
import { WorkoutSummaryContainer } from "./containers/workout/WorkoutSummaryContainer";

export const WorkoutRouter = () => (
  <>
    <Route path="/workout/list" component={WorkoutListContainer} />
    <Route path="/workout/summary" component={WorkoutSummaryContainer} />
  </>
);
