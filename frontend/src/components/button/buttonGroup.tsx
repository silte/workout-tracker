import React from "react";

import MuiButtonGroup from "@material-ui/core/ButtonGroup";

interface IButtonGroup {
  children: any;
  className?: string;
}

export const ButtonGroup = (props: IButtonGroup) => (
  <MuiButtonGroup {...props} />
);
