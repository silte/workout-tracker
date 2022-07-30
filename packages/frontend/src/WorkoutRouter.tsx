import { Route, Routes } from 'react-router-dom';

import WorkoutContainer from './containers/workout/WorkoutContainer';
import WorkoutListContainer from './containers/workout/WorkoutListContainer';
import WorkoutSummaryContainer from './containers/workout/WorkoutSummaryContainer';

const WorkoutRouter = (): JSX.Element => (
  <Routes>
    <Route path="/list" element={<WorkoutListContainer />} />
    <Route path="/summary" element={<WorkoutSummaryContainer />} />
    <Route path="/summary/:startDate" element={<WorkoutSummaryContainer />} />
    <Route
      path="/summary/:startDate/:endDate"
      element={<WorkoutSummaryContainer />}
    />
    <Route path="/:workoutId" element={<WorkoutContainer />} />
    <Route
      path="/:workoutId/:chartStartIndex/:chartEndIndex"
      element={<WorkoutContainer />}
    />
  </Routes>
);

export default WorkoutRouter;
