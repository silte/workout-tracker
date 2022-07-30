import { Role } from '@local/types';
import { Routes, Route } from 'react-router-dom';

import { useUsersControllerFindOwnUserQuery } from '../../redux/generated/api';

import SuuntoApi from './dataSources/SuuntoApi';
import { Profile } from './Profile';
import { ProfileOverrideData } from './ProfileOverrideData';
import { UserPreferencesRouter } from './UserPreferences/UserPreferencesRouter';

export const ProfileRouter = (): JSX.Element => {
  const { data: profileInfo } = useUsersControllerFindOwnUserQuery();

  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="user-preferences/*" element={<UserPreferencesRouter />} />
      <Route path="suunto" element={<SuuntoApi />} />
      {profileInfo?.roles.includes(Role.testUser) && (
        <Route path="override-data" element={<ProfileOverrideData />} />
      )}
    </Routes>
  );
};
