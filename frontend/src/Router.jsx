import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";

export const Router = () => {
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/exercise" component={ExerciseRouter} />
  </BrowserRouter>;
};
