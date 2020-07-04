import React from 'react';

import './container.scss';

export const Container = ({ children, className = '', small, medium }: IContainer) => {
  const classes = ['container', className];

  small && classes.push('container--small');
  medium && classes.push('container--medium');

  return <div className={classes.join(' ')}>{children}</div>;
};

interface IContainer {
  children: any;
  className?: string;
  small?: boolean;
  medium?: boolean;
}
