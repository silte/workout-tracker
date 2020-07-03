import React from 'react';

import './listing.scss';

const Listing = ({ listingComponent, arrayOfContent, className = '', col2, col3, keyFieldName }) => {
  const ListingComponent = listingComponent;
  const classes = ['listing', className];

  col2 && classes.push('col--2');
  col3 && classes.push('col--3');

  return (
    <ul className={classes.join(' ')}>
      {arrayOfContent.map(fields => (
        <li className="listing__item" key={fields[keyFieldName]}>
          <ListingComponent {...fields} />
        </li>
      ))}
    </ul>
  );
};

export default Listing;
