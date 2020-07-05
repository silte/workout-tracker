import React from 'react';

import './spacer.scss';

interface ISpacer {
  children: any;
  className?: string;
  large?: boolean;
  small?: boolean;
}

export const Spacer = ({ children, large, small, className = '' }: ISpacer) => {
  const classes = ['spacer', className];

  small && classes.push('spacer--small');
  large && classes.push('spacer--large');

  return <div className={classes.join(' ')}>{children}</div>;
};
