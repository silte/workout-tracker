import React, { Children } from 'react';

interface WorkoutStackedListRowsProps {
  children: React.ReactNode | React.ReactNode[];
}

export const WorkoutStackedListRows = ({
  children,
}: WorkoutStackedListRowsProps): JSX.Element => {
  return (
    <ul className="-mx-4" data-testid="workout-stacked-list-container">
      {Children.map(children, (child) => child)}
    </ul>
  );
};
