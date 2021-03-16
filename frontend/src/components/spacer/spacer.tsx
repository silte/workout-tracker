/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";

import "./spacer.scss";

interface ISpacer {
  children: any;
  className?: string;
  large?: boolean;
  small?: boolean;
}

const Spacer = ({
  children,
  large,
  small,
  className = "",
}: ISpacer): JSX.Element => {
  const classes = ["spacer", className];

  small && classes.push("spacer--small");
  large && classes.push("spacer--large");

  return <div className={classes.join(" ")}>{children}</div>;
};

export default Spacer;
