import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/layout/layout';
import IssuesWithLogin from './IssuesWithLogin';
import Home from './pages/Home';
import Login from './pages/login/login';
import { ProfileRouter } from './pages/profile/ProfileRouter';
import PrivacyPolicy from './Privacy';
import WorkoutRouter from './WorkoutRouter';

interface IProps {
  isLoggedIn: boolean;
}

const WorkoutTracker = ({ isLoggedIn = false }: IProps): JSX.Element => {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/issues-with-login" element={<IssuesWithLogin />} />
      {!isLoggedIn ? (
        <Route path="*" element={<Login />} />
      ) : (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workout/*" element={<WorkoutRouter />} />
          <Route path="/profile/*" element={<ProfileRouter />} />
        </Route>
      )}
    </Routes>
  );
};

export default WorkoutTracker;
