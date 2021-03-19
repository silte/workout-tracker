/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-expressions */
import React from "react";

const Listing = <T, K extends keyof T>({
  listingComponent,
  arrayOfContent,
  className = "",
  keyFieldName,
}: IListing<T, K>): JSX.Element => {
  const ListingComponent = listingComponent;
  const classes = [className];

  return (
    <ul className={classes.join(" ")}>
      {arrayOfContent.map((fields, index) => (
        <li
          className={index < arrayOfContent.length - 1 ? "mb-4" : ""}
          key={(fields[keyFieldName] as unknown) as string}
        >
          <ListingComponent {...fields} />
        </li>
      ))}
    </ul>
  );
};

interface IListing<T, K> {
  className?: string;
  listingComponent: React.ElementType;
  arrayOfContent: T[];
  keyFieldName: K;
}

export default Listing;
