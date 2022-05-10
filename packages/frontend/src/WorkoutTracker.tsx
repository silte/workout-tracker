import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout/layout';
import IssuesWithLogin from './IssuesWithLogin';
import SuuntoApi from './pages/dataSources/SuuntoApi';
import Home from './pages/Home';
import Login from './pages/login/login';
import ProfileRouter from './pages/profile/ProfileRouter';
import PrivacyPolicy from './Privacy';
import WorkoutRouter from './WorkoutRouter';

interface IProps {
  isLoggedIn: boolean;
}

const WorkoutTracker = ({ isLoggedIn = false }: IProps): JSX.Element => {
  return (
    <Switch>
      <Route path="/privacy-policy">
        <PrivacyPolicy />
      </Route>
      <Route path="/issues-with-login">
        <IssuesWithLogin />
      </Route>
      {!isLoggedIn && (
        <Route path="/">
          <Login />
        </Route>
      )}
      <Layout>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/data-source/suunto">
          <SuuntoApi />
        </Route>
        <Route path="/workout">
          <WorkoutRouter />
        </Route>
        <Route path="/profile">
          <ProfileRouter />
        </Route>
      </Layout>
    </Switch>
  );
};

export default WorkoutTracker;
