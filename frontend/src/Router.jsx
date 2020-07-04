import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { WorkoutRouter } from './WorkoutRouter';

export const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/workout" component={WorkoutRouter} />
  </BrowserRouter>
);
