import { WorkoutSummaryDto } from '@local/types';
import { Link } from 'react-router-dom';

import getActivityName from '../../utils/activityInfo';
import { metresToKilometres } from '../../utils/distanceConverter';
import { unixtimeToDate, secondsToHms } from '../../utils/timeConverter';

interface IWorkoutDataItemProps {
  label: string;
  children: React.ReactNode;
}

const WorkoutDataItem = ({ label, children }: IWorkoutDataItemProps) => {
  const type = label.split(' ').join('-').toLowerCase();

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
}: WorkoutSummaryDto): React.ReactElement => (
  <article className="workout-item">
    <Link
      to={`/workout/${workoutKey}`}
      className="block px-6 py-3 overflow-x-auto overflow-y-hidden border-gray-100 border-solid rounded-md bg-gray-50 border-1 whitespace-nowrap hover:border-gray-200 hover:bg-gray-100"
    >
      <ul className="grid justify-between gap-8 grid-cols-workout-item">
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
