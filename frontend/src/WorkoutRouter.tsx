import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkoutListContainer } from "./containers/workout/WorkoutListContainer";
import { WorkoutSummaryContainer } from "./containers/workout/WorkoutSummaryContainer";
import { WorkoutContainer } from "./containers/workout/WorkoutContainer";

export const WorkoutRouter = () => (
  <Switch>
    <Route path="/workout/list" component={WorkoutListContainer} />
    <Route path="/workout/summary" component={WorkoutSummaryContainer} />
    <Route path="/workout/:workoutId" component={WorkoutContainer} />
  </Switch>
);
