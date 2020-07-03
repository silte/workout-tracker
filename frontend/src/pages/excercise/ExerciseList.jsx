import React from "react";
import { getActivityName } from "../../utils/activityInfo";
import { unixtimeToString } from "../../utils/timeConverter";

export const ExerciseList = ({ exerciseList }) => (
  <>
    <h1>Exercise list</h1>
    <ul>
      {exerciseList.map((exercise) => (
        <Exercise {...exercise} />
      ))}
    </ul>
  </>
);

const Exercise = ({
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
    {getActivityName(activityId)} {unixtimeToString(startTime)}, time:{" "}
    {totalTime}, distance: {totalDistance}m, max speed: {maxSpeed}
  </li>
);
