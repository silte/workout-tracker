import React, { useEffect, useState } from 'react';

import Notification from './components/notification/notification';
import { getAuthenticationStatus } from './services/authentication-service';
import WorkoutTracker from './WorkoutTracker';

const App = (): JSX.Element => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<IAuthenticationStatus>({
      authenticated: false,
    });

  useEffect(() => {
    const fetchUserInfo = async () => {
      setAuthenticationStatus(await getAuthenticationStatus());
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      {authenticationStatus.errors && (
        <Notification
          type="error"
          label="Something went wrong!"
          className="z-20"
        >
          {authenticationStatus.errors?.join(' ') || ''}
        </Notification>
      )}
      <WorkoutTracker isLoggedIn={authenticationStatus?.authenticated} />
    </>
  );
};

export default App;
