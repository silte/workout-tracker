import React from 'react';

import './heading.scss';

export const Heading = ({ headingLevel = 2, className = '', children, center }: IHeading) => {
  const HeadingElement: any = `h${headingLevel}`;
  const classes = ['heading', `heading--level-${headingLevel}`, className];

  center && classes.push('heading--center');

  return <HeadingElement className={classes.join(' ')}>{children}</HeadingElement>;
};

interface IHeading {
  children: any;
  className?: string;
  center?: boolean;
  headingLevel: 1 | 2 | 3 | 4 | 5;
}
