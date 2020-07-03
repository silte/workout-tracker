import React, { useEffect, useState } from "react";
import Notification from "./components/notification/notification";
import AppRouter from "./AppRouter";
import { getAuthenticationStatus } from "./services/AuthenticationService";

const App = (): JSX.Element => {
  const [
    authenticationStatus,
    setAuthenticationStatus,
  ] = useState<IAuthenticationStatus>({
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
          {authenticationStatus.errors?.join(" ") || ""}
        </Notification>
      )}
      <AppRouter isLoggedIn={authenticationStatus?.authenticated} />
    </>
  );
};

export default App;