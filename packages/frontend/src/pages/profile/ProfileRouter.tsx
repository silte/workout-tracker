import { Switch, Route } from 'react-router-dom';

import Container from '../../components/container/container';
import { useUsersControllerFindOwnUserQuery } from '../../redux/generated/api';

import Profile from './Profile';
import ProfileNavigation from './ProfileNavigation';

const ProfileRouter = (): JSX.Element => {
  const { data: profileInfo } = useUsersControllerFindOwnUserQuery();

  return (
    <Container
      className="mt-6 sm:mt-12"
      sidebarComponent={<ProfileNavigation userRoles={profileInfo?.roles} />}
    >
      <Switch>
        <Route exact path="/profile">
          <Profile profileInfo={profileInfo ?? null} />
        </Route>
      </Switch>
    </Container>
  );
};

export default ProfileRouter;
