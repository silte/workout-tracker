import React from 'react';
import { getActivityName } from '../../utils/activityInfo';
import { unixtimeToString } from '../../utils/timeConverter';

import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import Listing from '../../components/listing/listing';
import Spacer from '../../components/spacer/spacer';

export const ExerciseList = ({ exerciseList }) => (
  <Container medium className="exercise-list">
    <Spacer large>
      <Heading headingLevel="1" className="exercise-list__title">
        Exercise list
      </Heading>
      <Listing arrayOfContent={exerciseList} listingComponent={Exercise} keyFieldName="workoutKey" />
    </Spacer>
  </Container>
);

const Exercise = ({
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
