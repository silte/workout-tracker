import MuiButtonGroup from '@material-ui/core/ButtonGroup';
import React from 'react';

interface IButtonGroup {
  children: React.Component[];
  className?: string;
}

const ButtonGroup = (props: IButtonGroup): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiButtonGroup {...props} />
);

export default ButtonGroup;
