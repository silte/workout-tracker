import React from 'react';

import './heading.scss';

const Heading = ({ headingLevel = 2, className = '', children, center }) => {
  const HeadingElement = `h${headingLevel}`;
  const classes = ['heading', `heading--level-${headingLevel}`, className];

  center && classes.push('heading--center');

  return <HeadingElement className={classes.join(' ')}>{children}</HeadingElement>;
};

export default Heading;
