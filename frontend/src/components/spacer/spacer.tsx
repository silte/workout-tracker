import React from 'react';

import './spacer.scss';

export const Spacer = ({ children, large, className = '' }: ISpacer) => {
  const classes = ['spacer', className];

  large && classes.push('spacer--large');

  return <div className={classes.join(' ')}>{children}</div>;
};

interface ISpacer {
  children: any;
  className?: string;
  large: boolean;
}
