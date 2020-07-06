import React from "react";

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Listing } from "../../components/listing/listing";
import { Spacer } from "../../components/spacer/spacer";
import { WorkoutItem } from "./WorkoutItem";
import { secondsToHms } from "../../utils/timeConverter";
import { getActivityName } from "../../utils/activityInfo";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

interface IWorkoutSummary {
  workoutList: IWorkoutSummaryData[];
  workoutSummaryData: ISummaryData[];
  setFilterStartDate: any;
  setFilterEndDate: any;
  setIsMultisportExposed: any;
}

export const WorkoutSummary = ({
  workoutList,
  workoutSummaryData,
  setFilterStartDate,
  setFilterEndDate,
  setIsMultisportExposed,
}: IWorkoutSummary) => {
  const onChangeFilterStartDate = ({ target: { value } }: { target: any }) =>
    setFilterStartDate(value !== "" ? new Date(value).getTime() : NaN);
  const onChangeFilterEndDate = ({ target: { value } }: { target: any }) =>
    setFilterEndDate(value !== "" ? new Date(value).getTime() : NaN);

  const toggleMultisportExpose = () =>
    setIsMultisportExposed((prev: boolean) => !prev);

  const workoutCount = workoutList.length;

  if (workoutCount === 0) {
    return (
      <div className="workout-summary">
        <Container small>
          <Heading
            headingLevel={1}
            className="workout-summary__title"
            label="Summary of"
          >
            Loading...
          </Heading>
        </Container>
      </div>
    );
  }

  return (
    <div className="workout-summary">
      <Container small>
        <Spacer large>
          <Spacer small>
            <Heading
              headingLevel={1}
              className="workout-summary__title"
              label="Summary of"
            >
              {workoutCount}{" "}
              {workoutCount > 1 || workoutCount === 0 ? "Workouts" : "Workout"}
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
            <button onClick={toggleMultisportExpose}>Toggle multisports</button>
          </Spacer>
          <Spacer small>
            <WorkoutTotalSummary workoutSummaryData={workoutSummaryData} />
          </Spacer>{" "}
          <Spacer small>
            <WorkoutAcivitySummary workoutSummaryData={workoutSummaryData} />
          </Spacer>
          <Spacer small>
            <Listing
              arrayOfContent={workoutList}
              listingComponent={WorkoutItem}
              keyFieldName="workoutKey"
            />
          </Spacer>
        </Spacer>
      </Container>
    </div>
  );
};

const WorkoutAcivitySummary = ({
  workoutSummaryData,
}: {
  workoutSummaryData: ISummaryData[];
}) => (
  <ul>
    {workoutSummaryData.map(
      ({ activityId, totalDistance, totalDuration, totalAscent }) => (
        <li key={activityId}>
          {getActivityName(activityId)}: duration {secondsToHms(totalDuration)},
          distance {metresToKilometres(totalDistance)}, ascent{" "}
          {getRoundedMetres(totalAscent)}
        </li>
      )
    )}
  </ul>
);

const WorkoutTotalSummary = ({
  workoutSummaryData,
}: {
  workoutSummaryData: ISummaryData[];
}) => {
  const workoutTotalSummaryData = workoutSummaryData.reduce(
    ({ totalAscent, totalDuration, totalDistance }, current) => ({
      activityId: -1,
      totalAscent: totalAscent + current.totalAscent,
      totalDuration: totalDuration + current.totalDuration,
      totalDistance: totalDistance + current.totalDistance,
    }),
    { totalAscent: 0, totalDuration: 0, totalDistance: 0 } as ISummaryData
  );

  return (
    <div className="workout-summary-data">
      <Heading headingLevel={2} label="Duration">
        {secondsToHms(workoutTotalSummaryData.totalDuration)}
      </Heading>
      <Heading headingLevel={2} label="Distance">
        {metresToKilometres(workoutTotalSummaryData.totalDistance)}
      </Heading>
      <Heading headingLevel={2} label="Ascent">
        {getRoundedMetres(workoutTotalSummaryData.totalAscent)}
      </Heading>
    </div>
  );
};
