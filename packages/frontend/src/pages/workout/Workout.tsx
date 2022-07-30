import { Container } from '../../components/container/container';
import { DescriptionList } from '../../components/description-list/description-list';
import { DescriptionListItem } from '../../components/description-list/description-list.item';
import { Loader } from '../../components/loader/loader';
import { useSetPageInfo } from '../../hooks/useSetPageInfo';
import { WorkoutDto } from '../../redux/generated/api';
import getActivityName from '../../utils/activityInfo';
import {
  metresToKilometres,
  getRoundedMetres,
} from '../../utils/distanceConverter';
import { unixtimeToDate, secondsToHms } from '../../utils/timeConverter';

import { WorkoutDetailsChart } from './workout-details-chart';

interface IWorkout {
  workout: WorkoutDto;
  chartStartIndex: number;
  chartEndIndex: number;
  setChartStartIndex(index: number): void;
  setChartEndIndex(index: number): void;
}

const Workout = ({
  workout,
  chartStartIndex,
  chartEndIndex: chartZoomLevel,
  setChartStartIndex,
  setChartEndIndex,
}: IWorkout): JSX.Element => {
  const isLoading = !('workoutKey' in workout);
  const title = isLoading
    ? 'Workout'
    : `${getActivityName(workout.activityId)} - ${unixtimeToDate(
        workout.startTime
      )}`;

  useSetPageInfo({
    title,
    backLink: '/workout/summary',
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container className="py-8">
      <DescriptionList>
        <DescriptionListItem label="Duration" isLarge>
          {secondsToHms(workout.totalTime)}
        </DescriptionListItem>
        <DescriptionListItem label="Distance">
          {metresToKilometres(workout.totalDistance ?? NaN)}
        </DescriptionListItem>
        <DescriptionListItem label="Ascent">
          {getRoundedMetres(workout.totalAscent)}
        </DescriptionListItem>
        <DescriptionListItem label="Max speed">
          {workout.maxSpeed}
        </DescriptionListItem>
      </DescriptionList>

      <WorkoutDetailsChart
        dataPoints={workout?.dataPoints ?? []}
        startTime={workout.startTime}
        startIndex={chartStartIndex}
        endIndex={chartZoomLevel}
        setStartIndex={setChartStartIndex}
        setZoomLevel={setChartEndIndex}
      />
    </Container>
  );
};

export default Workout;
