import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkoutRouter from "./WorkoutRouter";

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/workout" component={WorkoutRouter} />
  </BrowserRouter>
);

export default Router;
