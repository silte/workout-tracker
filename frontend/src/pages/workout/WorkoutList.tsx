import React from 'react';

import { Container } from '../../components/container/container';
import { Heading } from '../../components/heading/heading';
import { Listing } from '../../components/listing/listing';
import { Spacer } from '../../components/spacer/spacer';
import { WorkoutItem } from './WorkoutItem';

export const WorkoutList = ({ workoutList }: IWorkoutList) => (
  <Container medium className="workout-list">
    <Spacer large>
      <Heading headingLevel={1} className="workout-list__title">
        Workout list
      </Heading>
      <Listing arrayOfContent={workoutList} listingComponent={WorkoutItem} keyFieldName="workoutKey" />
    </Spacer>
  </Container>
);

interface IWorkoutList {
  workoutList: IWorkoutSummaryData[];
}