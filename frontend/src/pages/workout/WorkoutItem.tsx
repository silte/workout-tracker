import React from 'react';
import { getActivityName } from '../../utils/activityInfo';
import { unixtimeToDate, secondsToHms } from '../../utils/timeConverter';
import { metresToKilometres } from '../../utils/distanceConverter';

export const WorkoutItem = ({ activityId, startTime, totalTime, totalDistance }: IWorkoutSummaryData) => (
  <article className="workout-item">
    <h2 className="workout-item__activity-name">{getActivityName(activityId)}</h2>
    <p className="workout-item__date">{unixtimeToDate(startTime)}</p>
    <p className="workout-item__total-time">{secondsToHms(totalTime)}</p>
    <p className="workout-item__distance">{metresToKilometres(totalDistance)}</p>
  </article>
);
