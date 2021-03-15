import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import PrivacyPolicy from "./Privacy";
import Login from "./pages/login/login";
import IssuesWithLogin from "./IssuesWithLogin";
import ProfileRouter from "./pages/profile/ProfileRouter";
import LoggedIn from "./LoggedIn";

interface IProps {
  isLoggedIn: boolean;
}

const AppRouter = ({ isLoggedIn = false }: IProps): JSX.Element => {
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
          <LoggedIn />
        </Route>
        <Route path="/profile">
          <ProfileRouter />
        </Route>
      </Layout>
    </Switch>
  );
};

export default AppRouter;
