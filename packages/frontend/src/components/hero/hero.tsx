import React from "react";
import Container from "../container/container";
import Heading from "../heading/heading";

type AccentColor = "pink" | "red" | "green" | "blue";

interface IProps {
  accent?: string;
  accentColor?: AccentColor;
  label: string;
  children: React.ReactNode;
  standAlone?: boolean;
  className?: string;
}

const Hero = ({
  accent,
  accentColor = "pink",
  label,
  children,
  standAlone,
  className = "",
}: IProps): JSX.Element => {
  const heroContent = (
    <div className="max-w-xl">
      <Heading headingLevel={1} accent={accent} accentColor={accentColor}>
        {label}
      </Heading>
      <p className="mt-5 text-xl leading-7 text-gray-500">{children}</p>
    </div>
  );

  if (standAlone) {
    return <div className={className}>{heroContent}</div>;
  }

  return (
    <div className={`pt-6 sm:pt-12 ${className}`}>
      <Container>{heroContent}</Container>
    </div>
  );
};

export default Hero;
