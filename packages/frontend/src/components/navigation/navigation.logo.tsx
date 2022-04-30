import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo512.png';

const NavigationLogo = (): JSX.Element => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img alt="logo" src={logo} style={{ maxWidth: '2.5em' }} />
      </Link>
    </div>
  );
};

export default NavigationLogo;
