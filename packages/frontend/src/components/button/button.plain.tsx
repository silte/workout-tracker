/* eslint-disable react/button-has-type */
import React, { MouseEvent } from 'react';

interface IProps {
  children: string;
  onClick?(e: MouseEvent): void;
  className: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

const ButtonPlain = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled,
}: IProps): JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={children}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPlain;
