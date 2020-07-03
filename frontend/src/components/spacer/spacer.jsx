import React from 'react';

import './spacer.scss';

const Spacer = ({ children, large, className = '' }) => {
  const classes = ['spacer', className];

  large && classes.push('spacer--large');

  return <div className={classes.join(' ')}>{children}</div>;
};

export default Spacer;
