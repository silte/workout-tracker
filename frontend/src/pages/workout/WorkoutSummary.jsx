import React from 'react';
import { getActivityName } from '../../utils/activityInfo';
import { unixtimeToString } from '../../utils/timeConverter';

import Container from '../../components/container/container';
import Heading from '../../components/heading/heading';
import Listing from '../../components/listing/listing';
import Spacer from '../../components/spacer/spacer';

export const WorkoutSummary = ({ workoutList, setFilterStartDate, setFilterEndDate }) => {
  const onChangeFilterStartDate = ({ target: { value } }) =>
    setFilterStartDate(value !== '' ? new Date(value).getTime() : null);
  const onChangeFilterEndDate = ({ target: { value } }) =>
    setFilterEndDate(value !== '' ? new Date(value).getTime() : null);

  return (
    <Container medium className="workout-summary">
      <Spacer large>
        <Heading headingLevel="1" className="workout-summary__title">
          Workout summary
        </Heading>
        <Heading headingLevel="3">Filters</Heading>
        <label>
          Start date:
          <input type="date" onChange={onChangeFilterStartDate} />
        </label>
        <br />
        <label>
          End date:
          <input type="date" onChange={onChangeFilterEndDate} />
        </label>
        <Listing arrayOfContent={workoutList} listingComponent={Workout} keyFieldName="workoutKey" />
      </Spacer>
    </Container>
  );
};

const Workout = ({
  activityId,
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
  <li>
    {getActivityName(activityId)} {unixtimeToString(startTime)}, time: {totalTime}, distance: {totalDistance}m, max
    speed: {maxSpeed}
  </li>
);
