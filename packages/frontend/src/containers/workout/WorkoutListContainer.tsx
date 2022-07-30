import WorkoutList from '../../pages/workout/WorkoutList';
import { useWorkoutSummaryControllerFindAllQuery } from '../../redux/generated/api';

const WorkoutListContainer = (): JSX.Element => {
  const { data: workoutList } = useWorkoutSummaryControllerFindAllQuery();

  return <WorkoutList workoutList={workoutList ?? []} />;
};

export default WorkoutListContainer;
