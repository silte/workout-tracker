import React from "react";

import "./button.scss";

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  children: any;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  className = "",
  isActive,
  ...props
}: IButton) => {
  const classes = ["button", className];

  isActive && classes.push("is-active");

  return (
    <button className={classes.join(" ")} {...props}>
      {children}
    </button>
  );
};
