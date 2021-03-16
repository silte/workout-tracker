import React from "react";

import MuiButtonGroup from "@material-ui/core/ButtonGroup";

interface IButtonGroup {
  children: any;
  className?: string;
}

const ButtonGroup = (props: IButtonGroup): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiButtonGroup {...props} />
);

export default ButtonGroup;
