import React from 'react';

import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import Listing from '../../components/listing/listing';
import SEO from '../../components/seo/seo';

import WorkoutItem from './WorkoutItem';

const WorkoutList = ({ workoutList }: IWorkoutList): JSX.Element => (
  <>
    <SEO title="Workout list" />
    <Container className="overflow-x-auto overflow-y-hidden py-16 lg:py-32">
      <Heading headingLevel={1} className="workout-list__title">
        Workout list
      </Heading>
      <Listing<IWorkoutSummary, 'workoutKey'>
        arrayOfContent={workoutList}
        listingComponent={WorkoutItem}
        keyFieldName="workoutKey"
      />
    </Container>
  </>
);

interface IWorkoutList {
  workoutList: IWorkoutSummary[];
}
export default WorkoutList;
