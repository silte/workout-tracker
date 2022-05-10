import { UserDto } from '@local/types';
import { useEffect, useState } from 'react';

import { getProfileInformation } from './services/profile-service';

const LoggedIn = (): JSX.Element => {
  const [authenticationStatus, setAuthenticationStatus] = useState<UserDto>();

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
