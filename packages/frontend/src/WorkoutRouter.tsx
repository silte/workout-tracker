import React from 'react';
import { Route, Switch } from 'react-router-dom';

import WorkoutContainer from './containers/workout/WorkoutContainer';
import WorkoutListContainer from './containers/workout/WorkoutListContainer';
import WorkoutSummaryContainer from './containers/workout/WorkoutSummaryContainer';

const WorkoutRouter = (): JSX.Element => (
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
    <Route
      exact
      path="/workout/:workoutId/:chartStartIndex/:chartEndIndex"
      component={WorkoutContainer}
    />
  </Switch>
);

export default WorkoutRouter;
