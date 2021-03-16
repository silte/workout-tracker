import React from "react";

import "./heading.scss";

const Heading = ({
  headingLevel = 2,
  className = "",
  children,
  center,
  label,
}: IHeading): JSX.Element => {
  const HeadingElement: any = `h${headingLevel}`;
  const classes = ["heading", `heading--level-${headingLevel}`, className];

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  center && classes.push("heading--center");

  return (
    <HeadingElement className={classes.join(" ")}>
      {label && <span className="heading__label">{label}</span>}
      {children}
    </HeadingElement>
  );
};

interface IHeading {
  children: any;
  className?: string;
  center?: boolean;
  headingLevel: 1 | 2 | 3 | 4 | 5;
  label?: string;
}

export default Heading;
