import React from 'react';

import './container.scss';

const Container = ({ children, className = '', small, medium }) => {
  const classes = ['container', className];

  small && classes.push('container--small');
  medium && classes.push('container--medium');

  return <div className={classes.join(' ')}>{children}</div>;
};

export default Container;
