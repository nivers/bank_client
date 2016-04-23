//npm modules
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//local
import App from './components/app';
import LandingPage from './components/landing_page';
import ManageAccount from './containers/manage_account';

export const MANAGE_ACCOUNT_ROUTE = '/manage_account';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path={MANAGE_ACCOUNT_ROUTE} component={ManageAccount} />
  </Route>
);
