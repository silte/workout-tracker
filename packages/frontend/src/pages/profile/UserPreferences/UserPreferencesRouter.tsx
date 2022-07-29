import { Route, Routes } from 'react-router-dom';

import { UserSeasonSettings } from './preferences/UserSeasonSettings';
import { UserWorkoutListChunkSize } from './preferences/UserWorkoutListChunkSize';
import { UserPreferences } from './UserPreferences';

export const UserPreferencesRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<UserPreferences />} />
      <Route path="/items-per-page" element={<UserWorkoutListChunkSize />} />
      <Route path="/season-settings" element={<UserSeasonSettings />} />
    </Routes>
  );
};
