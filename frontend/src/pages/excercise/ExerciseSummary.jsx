import React from "react";
import { getActivityName } from "../../utils/activityInfo";
import { unixtimeToString } from "../../utils/timeConverter";

export const ExerciseSummary = ({
  exerciseList,
  setFilterStartDate,
  setFilterEndDate,
}) => {
  const onChangeFilterStartDate = ({ target: { value } }) =>
    setFilterStartDate(value !== "" ? new Date(value).getTime() : null);
  const onChangeFilterEndDate = ({ target: { value } }) =>
    setFilterEndDate(value !== "" ? new Date(value).getTime() : null);

  return (
    <div>
      <h1>Exercise summary</h1>
      <div>
        <h3>Filters</h3>
        <label>
          Start date:
          <input type="date" onChange={onChangeFilterStartDate} />
        </label>
        <br />
        <label>
          End date:
          <input type="date" onChange={onChangeFilterEndDate} />
        </label>
      </div>
      <ul>
        {exerciseList.map((exercise) => (
          <Exercise {...exercise} />
        ))}
      </ul>
    </div>
  );
};

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
