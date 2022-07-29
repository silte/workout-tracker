import { NavLink } from 'react-router-dom';

import { Icon, IconName } from '../icon/icon';

export interface WorkoutStackedListRowProps {
  duration?: string;
  additionalInfoLabel?: string;
  additionalInfo?: string;
  date: string;
  label: string;
  link: string;
  iconType?: IconName;
  id: string;
}

export const WorkoutStackedListRow = ({
  duration,
  additionalInfo,
  additionalInfoLabel,
  date,
  label,
  link,
  iconType,
  id,
}: WorkoutStackedListRowProps): JSX.Element => {
  return (
    <li data-testid={id} className="group">
      <NavLink
        to={link}
        className={`relative flex gap-4 items-center focus-within:bg-gray-100 hover:bg-gray-100 overflow-hidden pl-4 lg:rounded-md`}
      >
        {iconType && (
          <Icon
            type={iconType}
            className={`stroke-black flex-shrink-0 pointer-events-none`}
          />
        )}
        <span className="text-base items-center gap-4 flex justify-between font-semibold tracking-tight py-4 pr-4 after:h-[1px] after:w-full after:absolute after:bg-gray-200 after:bottom-0 flex-1 overflow-hidden group-last:after:hidden">
          <span>
            <span className="grid">
              <span className="truncate">{label}</span>
              <span className="text-sm font-normal text-gray-600 truncate">
                <span>
                  <span className="sr-only">Date: </span>
                  {date}
                </span>
                {additionalInfo && (
                  <>
                    {' - '}
                    <span className="sr-only">{additionalInfoLabel}</span>
                    <span>{additionalInfo}</span>
                  </>
                )}
              </span>
            </span>
          </span>
          <span className={`flex-shrink-0 ml-auto `}>
            <span className="sr-only">Duration: </span>
            {duration}
          </span>
          <Icon
            type={IconName.chevronRight}
            className="flex-shrink-0 pointer-events-none stroke-gray-300"
          />
        </span>
      </NavLink>
    </li>
  );
};
