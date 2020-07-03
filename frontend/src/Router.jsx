import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { ExerciseRouter } from "./ExerciseRouter";

export const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/exercise" component={ExerciseRouter} />
  </BrowserRouter>
);
