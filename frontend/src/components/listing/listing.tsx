/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-expressions */
import React from "react";

const Listing = ({
  listingComponent,
  arrayOfContent,
  className = "",
  keyFieldName,
}: IListing): JSX.Element => {
  const ListingComponent = listingComponent;
  const classes = [className];

  return (
    <ul className={classes.join(" ")}>
      {arrayOfContent.map((fields, index) => (
        <li
          className={index < arrayOfContent.length - 1 ? "mb-4" : ""}
          key={fields[keyFieldName]}
        >
          <ListingComponent {...fields} />
        </li>
      ))}
    </ul>
  );
};

interface IListing {
  className?: string;
  listingComponent: any;
  arrayOfContent: any[];
  keyFieldName: string;
}

export default Listing;
