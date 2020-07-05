import React from 'react';

import { Container } from '../../components/container/container';
import { Heading } from '../../components/heading/heading';
import { Listing } from '../../components/listing/listing';
import { Spacer } from '../../components/spacer/spacer';
import { WorkoutItem } from './WorkoutItem';
import { secondsToHms } from '../../utils/timeConverter';
import { metresToKilometres, getRoundedMetres } from '../../utils/distanceConverter';

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  setFilterStartDate: any;
  setFilterEndDate: any;
}

interface ISummaryData {
  totalDuration: number;
  totalDistance: number;
  totalAscent: number;
}

export const WorkoutSummary = ({ workoutList, setFilterStartDate, setFilterEndDate }: IWorkoutSummary) => {
  const onChangeFilterStartDate = ({ target: { value } }: { target: any }) =>
    setFilterStartDate(value !== '' ? new Date(value).getTime() : NaN);
  const onChangeFilterEndDate = ({ target: { value } }: { target: any }) =>
    setFilterEndDate(value !== '' ? new Date(value).getTime() : NaN);

  const workoutCount = workoutList.length;

  return (
    <div className="workout-summary">
      <Container small>
        <Spacer large>
          <Spacer small>
            <Heading headingLevel={1} className="workout-summary__title" label="Summary of">
              {workoutCount} {workoutCount > 1 || workoutCount === 0 ? 'Workouts' : 'Workout'}
            </Heading>
            <Heading headingLevel={3}>Filters</Heading>
            <label>
              Start date:
              <input type="date" onChange={onChangeFilterStartDate} />
            </label>
            <br />
            <label>
              End date:
              <input type="date" onChange={onChangeFilterEndDate} />
            </label>
          </Spacer>
          <Spacer small>
            <WorkoutSummaryData workoutList={workoutList} />
          </Spacer>
          <Spacer small>
            <Listing arrayOfContent={workoutList} listingComponent={WorkoutItem} keyFieldName="workoutKey" />
          </Spacer>
        </Spacer>
      </Container>
    </div>
  );
};

const WorkoutSummaryData = ({ workoutList }: { workoutList: IWorkoutSummaryData[] }) => {
  const workoutSummaryData = workoutList.reduce(
    ({ totalDuration, totalDistance, totalAscent }: ISummaryData, currentValue) => {
      return {
        totalDuration: totalDuration + currentValue.totalTime,
        totalDistance: totalDistance + currentValue.totalDistance,
        totalAscent: totalAscent + currentValue.totalAscent,
      };
    },
    { totalDuration: 0, totalDistance: 0, totalAscent: 0 },
  );

  return (
    <div className="workout-summary-data">
      <Heading headingLevel={2} label="Duration">
        {secondsToHms(workoutSummaryData.totalDuration)}
      </Heading>
      <Heading headingLevel={2} label="Distance">
        {metresToKilometres(workoutSummaryData.totalDistance)}
      </Heading>
      <Heading headingLevel={2} label="Ascent">
        {getRoundedMetres(workoutSummaryData.totalAscent)}
      </Heading>
    </div>
  );
};
