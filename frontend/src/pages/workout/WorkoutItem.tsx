import React from "react";
import { Link } from "react-router-dom";
import getActivityName from "../../utils/activityInfo";
import { unixtimeToDate, secondsToHms } from "../../utils/timeConverter";
import { metresToKilometres } from "../../utils/distanceConverter";

interface IWorkoutDataItemProps {
  label: string;
  children: React.ReactNode;
}

const WorkoutDataItem = ({ label, children }: IWorkoutDataItemProps) => {
  const type = label.split(" ").join("-").toLowerCase();

  return (
    <li className="flex flex-col" data-type={type}>
      <span className="text-sm opacity-75">{label}</span>
      <p className="text-lg font-bold">{children}</p>
    </li>
  );
};

const WorkoutItem = ({
  activityId,
  startTime,
  totalTime,
  totalDistance,
  workoutKey,
}: IWorkoutSummary): React.ReactElement => (
  <article className="workout-item">
    <Link
      to={`/workout/${workoutKey}`}
      className="block py-3 px-6 bg-gray-50 rounded-md border-solid border-gray-100 border-1 overflow-x-auto overflow-y-hidden whitespace-nowrap hover:border-gray-200 hover:bg-gray-100"
    >
      <ul className="grid grid-cols-workout-item justify-between gap-8">
        <WorkoutDataItem label="Activity">
          {getActivityName(activityId)}
        </WorkoutDataItem>
        <WorkoutDataItem label="Date">
          {unixtimeToDate(startTime)}
        </WorkoutDataItem>
        <WorkoutDataItem label="Total time">
          {secondsToHms(totalTime)}
        </WorkoutDataItem>
        <WorkoutDataItem label="Distance">
          {metresToKilometres(totalDistance)}
        </WorkoutDataItem>
      </ul>
    </Link>
  </article>
);

export default WorkoutItem;
