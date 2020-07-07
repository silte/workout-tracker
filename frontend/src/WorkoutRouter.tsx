import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkoutListContainer } from "./containers/workout/WorkoutListContainer";
import { WorkoutSummaryContainer } from "./containers/workout/WorkoutSummaryContainer";
import { WorkoutContainer } from "./containers/workout/WorkoutContainer";

export const WorkoutRouter = () => (
  <Switch>
    <Route exact path="/workout/list" component={WorkoutListContainer} />
    <Route exact path="/workout/summary" component={WorkoutSummaryContainer} />
    <Route
      exact
      path="/workout/summary/:startDate"
      component={WorkoutSummaryContainer}
    />
    <Route
      exact
      path="/workout/summary/:startDate/:endDate"
      component={WorkoutSummaryContainer}
    />
    <Route exact path="/workout/:workoutId" component={WorkoutContainer} />
  </Switch>
);
