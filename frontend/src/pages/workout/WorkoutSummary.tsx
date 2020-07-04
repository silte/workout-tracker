import React from 'react';

import { Container } from '../../components/container/container';
import { Heading } from '../../components/heading/heading';
import { Listing } from '../../components/listing/listing';
import { Spacer } from '../../components/spacer/spacer';
import { WorkoutItem } from './WorkoutItem';

export const WorkoutSummary = ({ workoutList, setFilterStartDate, setFilterEndDate }: IWorkoutSummary) => {
  const onChangeFilterStartDate = ({ target: { value } }: { target: any }) =>
    setFilterStartDate(value !== '' ? new Date(value).getTime() : NaN);
  const onChangeFilterEndDate = ({ target: { value } }: { target: any }) =>
    setFilterEndDate(value !== '' ? new Date(value).getTime() : NaN);

  return (
    <Container medium className="workout-summary">
      <Spacer large>
        <Heading headingLevel={1} className="workout-summary__title">
          Workout summary
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
        <Listing arrayOfContent={workoutList} listingComponent={WorkoutItem} keyFieldName="workoutKey" />
      </Spacer>
    </Container>
  );
};

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  setFilterStartDate: any;
  setFilterEndDate: any;
}
