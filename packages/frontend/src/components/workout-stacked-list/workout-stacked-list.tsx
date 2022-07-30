import { PagerOptions } from '../../hooks/usePager';
import { Pager } from '../pager/pager';

import {
  WorkoutStackedListRow,
  WorkoutStackedListRowProps,
} from './workout-stacked-list.row';
import { WorkoutStackedListRows } from './workout-stacked-list.rows';

interface WorkoutStackedListProps {
  title?: string;
  rows: WorkoutStackedListRowProps[];
  pagerOptions: PagerOptions;
  className?: string;
  isPagerHidden?: boolean;
}

export const WorkoutStackedList = ({
  title,
  rows,
  className = '',
  pagerOptions,
  isPagerHidden,
}: WorkoutStackedListProps): JSX.Element | null => {
  if (!rows.length) return null;

  return (
    <section className={`${className}`}>
      {title && <h2 className="sr-only">{title}</h2>}
      <WorkoutStackedListRows>
        {rows.map(
          ({
            duration,
            additionalInfo,
            additionalInfoLabel,
            date,
            label,
            link,
            iconType,
            id,
          }) => (
            <WorkoutStackedListRow
              key={id}
              additionalInfo={additionalInfo}
              additionalInfoLabel={additionalInfoLabel}
              duration={duration}
              date={date}
              label={label}
              link={link}
              iconType={iconType}
              id={id}
            />
          )
        )}
      </WorkoutStackedListRows>
      {pagerOptions.pageCount &&
        pagerOptions.pageCount > 1 &&
        !isPagerHidden && (
          <Pager isCentered className="mt-4" pagerOptions={pagerOptions} />
        )}
    </section>
  );
};
