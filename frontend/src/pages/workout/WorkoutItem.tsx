import React from 'react';
import { getActivityName } from '../../utils/activityInfo';
import { unixtimeToDate, secondsToHms } from '../../utils/timeConverter';
import { metresToKilometres } from '../../utils/distanceConverter';

import './WorkoutItem.scss';

export const WorkoutItem = ({ activityId, startTime, totalTime, totalDistance }: IWorkoutSummaryData) => (
  <article className="workout-item">
    <ul className="workout-data">
      <WorkoutDataItem label="Activity">{getActivityName(activityId)}</WorkoutDataItem>
      <WorkoutDataItem label="Date">{unixtimeToDate(startTime)}</WorkoutDataItem>
      <WorkoutDataItem label="Total time">{secondsToHms(totalTime)}</WorkoutDataItem>
      <WorkoutDataItem label="Distance">{metresToKilometres(totalDistance)}</WorkoutDataItem>
    </ul>
  </article>
);

const WorkoutDataItem = ({ label, children }: IWorkoutDataItem) => {
  const type = label.split(' ').join('-').toLowerCase();

  return (
    <li className={`workout-data__item workout-data__item--${type}`}>
      <span className="workout-item__label">{label}</span>
      <p className="workout-item__type">{children}</p>
    </li>
  );
};

interface IWorkoutDataItem {
  label: string;
  children: any;
}
