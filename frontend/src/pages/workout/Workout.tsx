import React from "react";

import { Container } from "../../components/container/container";
import { Heading } from "../../components/heading/heading";
import { Spacer } from "../../components/spacer/spacer";
import { getActivityName } from "../../utils/activityInfo";
import { unixtimeToDate, secondsToHms } from "../../utils/timeConverter";
import {
  metresToKilometres,
  getRoundedMetres,
} from "../../utils/distanceConverter";

interface IWorkout {
  workout: IWorkoutData;
}

export const Workout = ({ workout }: IWorkout) =>
  "activityId" in workout ? (
    <Container small className="workout">
      <Spacer large>
        <Heading headingLevel={1} className="workout__title">
          {getActivityName(workout.activityId)}{" "}
          {unixtimeToDate(workout.startTime)}
        </Heading>
        <Heading headingLevel={2} label="Duration">
          {secondsToHms(workout.totalTime)}
        </Heading>
        <Heading headingLevel={2} label="Distance">
          {metresToKilometres(workout.totalDistance)}
        </Heading>
        <Heading headingLevel={2} label="Ascent">
          {getRoundedMetres(workout.totalAscent)}
        </Heading>
        <Heading headingLevel={2} label="Max speed">
          {workout.maxSpeed}
        </Heading>
      </Spacer>
    </Container>
  ) : (
    <h1>Loading...</h1>
  );
