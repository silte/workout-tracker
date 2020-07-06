import React from 'react';

import { Container } from '../../components/container/container';
import { Heading } from '../../components/heading/heading';
import { Listing } from '../../components/listing/listing';
import { Spacer } from '../../components/spacer/spacer';
import { WorkoutItem } from './WorkoutItem';
import { secondsToHms } from '../../utils/timeConverter';
import { getActivityName } from '../../utils/activityInfo';
import { metresToKilometres, getRoundedMetres } from '../../utils/distanceConverter';

import './WorkoutSummary.scss';

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  workoutSummaryData: ISummaryData[];
  setFilterStartDate: any;
  setFilterEndDate: any;
  setIsMultisportExposed: any;
  isMultisportExposed: boolean;
}

export const WorkoutSummary = ({
  workoutList,
  workoutSummaryData,
  setFilterStartDate,
  setFilterEndDate,
  setIsMultisportExposed,
  isMultisportExposed,
}: IWorkoutSummary) => {
  const onChangeFilterStartDate = ({ target: { value } }: { target: any }) =>
    setFilterStartDate(value !== '' ? new Date(value).getTime() : NaN);
  const onChangeFilterEndDate = ({ target: { value } }: { target: any }) =>
    setFilterEndDate(value !== '' ? new Date(value).getTime() : NaN);

  const toggleMultisportExpose = () => setIsMultisportExposed((prev: boolean) => !prev);

  const workoutCount = workoutList.length;

  if (workoutCount === 0) {
    return (
      <div className="workout-summary">
        <Container>
          <Spacer large>
            <Spacer small>
              <Heading headingLevel={1} className="workout-summary__title" label="Summary of">
                Loading...
              </Heading>
            </Spacer>
          </Spacer>
        </Container>
      </div>
    );
  }

  return (
    <div className="workout-summary">
      <Spacer large>
        <Container>
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
        </Container>
        <Container>
          <Spacer small>
            <div className="workout-summary__multisport">
              <button
                className={`workout-summary__toggle ${isMultisportExposed ? 'is-active' : ''}`}
                onClick={toggleMultisportExpose}
              >
                Toggle multisports
              </button>
            </div>
            <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
            <WorkoutAcivitySummary workoutSummaryData={workoutSummaryData} />
          </Spacer>
        </Container>
        <Container small>
          <Listing
            arrayOfContent={workoutList.slice(0, 100)}
            listingComponent={WorkoutItem}
            keyFieldName="workoutKey"
          />
        </Container>
      </Spacer>
    </div>
  );
};

const WorkoutTotalSummary = ({ workoutSummaryData }: { workoutSummaryData: ISummaryData[] }) => {
  const workoutTotalSummaryData = workoutSummaryData.reduce(
    ({ totalAscent, totalDuration, totalDistance }, current) => ({
      activityId: -1,
      totalAscent: totalAscent + current.totalAscent,
      totalDuration: totalDuration + current.totalDuration,
      totalDistance: totalDistance + current.totalDistance,
    }),
    { totalAscent: 0, totalDuration: 0, totalDistance: 0 } as ISummaryData,
  );

  return (
    <ul className="listing col--3 workout-summary-data workout-summary-data--total">
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Duration" className="h3">
          {secondsToHms(workoutTotalSummaryData.totalDuration)}
        </Heading>
      </li>
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Distance" className="h3">
          {metresToKilometres(workoutTotalSummaryData.totalDistance)}
        </Heading>
      </li>
      <li className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} label="Ascent" className="h3">
          {getRoundedMetres(workoutTotalSummaryData.totalAscent)}
        </Heading>
      </li>
    </ul>
  );
};

const WorkoutAcivitySummary = ({ workoutSummaryData }: { workoutSummaryData: ISummaryData[] }) => (
  <ul className="listing col--3 workout-summary-data workout-summary-data--activity">
    {workoutSummaryData.map(({ activityId, totalDistance, totalDuration, totalAscent }) => (
      <li key={activityId} className="listing__item workout-summary-data__item">
        <Heading headingLevel={2} className="h4">
          {getActivityName(activityId)}
        </Heading>
        <Heading headingLevel={3} label="Duration" className="h4">
          {secondsToHms(totalDuration)}
        </Heading>
        <Heading headingLevel={3} label="Distance" className="h4">
          {metresToKilometres(totalDistance)}
        </Heading>
        <Heading headingLevel={3} label="Ascent" className="h4">
          {getRoundedMetres(totalAscent)}
        </Heading>
      </li>
    ))}
  </ul>
);
