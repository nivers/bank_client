//npm modules
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//local
import App from './components/app';
import LandingPage from './components/landing_page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
  </Route>
);
