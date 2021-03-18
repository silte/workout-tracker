import React from "react";

type IHeadingSize = "s" | "m" | "l";

type IColors = "pink" | "red" | "green" | "blue" | "white" | "black";

interface IHeading {
  children: React.ReactNode;
  className?: string;
  headingLevel: 1 | 2 | 3 | 4 | 5;
  accent?: string;
  color?: "white" | "black";
  accentColor?: IColors;
  headingSize?: IHeadingSize;
}

const getHeadingTextSize = (headingSize: IHeadingSize): string => {
  if (headingSize === "s") {
    return "text-lg sm:text-xl";
  }
  if (headingSize === "m") {
    return "text-2xl sm:text-3xl";
  }
  return "text-4xl sm:text-5xl";
};
const getAccentTextSize = (headingSize: IHeadingSize): string => {
  if (headingSize === "s") {
    return "text-sm";
  }
  if (headingSize === "m") {
    return "text-lg";
  }
  return "text-2xl";
};

const getTextColor = (color: IColors): string => {
  if (color === "black") {
    return "text-gray-900";
  }
  if (color === "blue") {
    return "text-blue-500";
  }
  if (color === "green") {
    return "text-green-500";
  }
  if (color === "pink") {
    return "text-pink-500";
  }
  if (color === "red") {
    return "text-red-500";
  }
  return "text-gray-50";
};

const Heading = ({
  headingLevel = 2,
  className = "",
  children,
  accent,
  color = "black",
  accentColor = "black",
  headingSize = "l",
}: IHeading): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HeadingElement: any = `h${headingLevel}`;

  return (
    <HeadingElement
      className={`tracking-tight leading-10 font-extrabold sm:leading-none ${getTextColor(
        color
      )} ${getHeadingTextSize(headingSize)} ${className}`}
    >
      {accent && (
        <>
          <span
            className={`${getAccentTextSize(headingSize)} ${getTextColor(
              accentColor
            )} leading-none`}
          >
            {accent}
          </span>
          <br />
        </>
      )}
      {children}
    </HeadingElement>
  );
};

export default Heading;
