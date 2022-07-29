import { useMemo } from 'react';

import { Container } from '../../components/container/container';
import { WorkoutStackedList } from '../../components/workout-stacked-list/workout-stacked-list';
import { PagerOptions } from '../../hooks/usePager';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import { WorkoutSummaryDto } from '../../redux/generated/api';
import getActivityName from '../../utils/activityInfo';
import { metresToKilometres } from '../../utils/distanceConverter';
import { secondsToHms, unixtimeToDate } from '../../utils/timeConverter';

type WorkoutListingProps = { workouts: WorkoutSummaryDto[] };

const WorkoutListing = ({ workouts }: WorkoutListingProps) =>
  useMemo(() => {
    const workoutList = workouts.map((workout) => ({
      additionalInfo: metresToKilometres(workout.totalDistance),
      additionalInfoLabel: 'Distance',
      duration: secondsToHms(workout.totalTime),
      date: unixtimeToDate(workout.startTime),
      label: getActivityName(workout.activityId),
      link: `/workout/${workout.workoutKey}`,
      id: workout._id,
    }));

    return (
      <WorkoutStackedList
        rows={workoutList}
        isPagerHidden
        pagerOptions={{} as PagerOptions}
      />
    );
  }, [workouts]);

const WorkoutList = ({ workoutList }: IWorkoutList): JSX.Element => {
  useSetPageInfo({ title: 'Workout list' });
  // className="py-16 overflow-x-auto overflow-y-hidden lg:py-32"
  return (
    <Container>
      <WorkoutListing workouts={workoutList} />
    </Container>
  );
};

interface IWorkoutList {
  workoutList: WorkoutSummaryDto[];
}
export default WorkoutList;
