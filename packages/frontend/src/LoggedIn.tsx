import React, { useEffect, useState } from 'react';

import { getProfileInformation } from './services/profile-service';

const LoggedIn = (): JSX.Element => {
  const [authenticationStatus, setAuthenticationStatus] = useState<IUser>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setAuthenticationStatus(await getProfileInformation());
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(authenticationStatus)}</pre>
    </div>
  );
};

export default LoggedIn;
