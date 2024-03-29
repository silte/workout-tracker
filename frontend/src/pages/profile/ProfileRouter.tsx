import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Container from "../../components/container/container";
import Profile from "./Profile";
import ProfileNavigation from "./ProfileNavigation";
import { getProfileInformation } from "./ProfileService";

const ProfileRouter = (): JSX.Element => {
  const [profileInfo, setProfileInfo] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setProfileInfo(await getProfileInformation());
    };
    fetchUserInfo();
  }, []);

  return (
    <Container
      className="mt-6 sm:mt-12"
      sidebarComponent={<ProfileNavigation userRoles={profileInfo?.roles} />}
    >
      <Switch>
        <Route exact path="/profile">
          <Profile profileInfo={profileInfo} />
        </Route>
      </Switch>
    </Container>
  );
};

export default ProfileRouter;
