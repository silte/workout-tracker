import React from 'react';
import { getActivityName } from '../../utils/activityInfo';
import { unixtimeToString } from '../../utils/timeConverter';

import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import Listing from '../../components/listing/listing';
import Spacer from '../../components/spacer/spacer';

export const WorkoutList = ({ workoutList }) => (
  <Container medium className="workout-list">
    <Spacer large>
      <Heading headingLevel="1" className="workout-list__title">
        Workout list
      </Heading>
      <Listing arrayOfContent={workoutList} listingComponent={Workout} keyFieldName="workoutKey" />
    </Spacer>
  </Container>
);

const Workout = ({
  activityId,
  workoutKey,
  startTime,
  totalTime,
  totalDistance,
  totalAscent,
  totalDescent,
  maxSpeed,
  hrmax,
  hravg,
  avgSpeed,
  avgCadence,
  feeling,
}) => (
  <article>
    {getActivityName(activityId)} {unixtimeToString(startTime)}, time: {totalTime}, distance: {totalDistance}m, max
    speed: {maxSpeed}
  </article>
);
