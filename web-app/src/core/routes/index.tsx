import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import Movies from '../../all-movies/dashboar.container';
import Home from '../../home/containers/home.container';
import Login from '../../user/login/dashboard.container';
import SignUp from '../../user/sign-up/dashboard.container';

// import Latest from './components/Latest';
// import Popular from './components/Popular';

// import UpComing from './components/UpComing';
// import Details from './containers/Details'; // eslint-disable-line import/no-named-as-default

// import NotFoundPage from './components/NotFoundPage.js';


export const history = createHistory()

const Routes = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/movies" component={Movies} />   
    <Route path="/login" component={Login} />   
    <Route path="/register" component={SignUp} />   
    <Route path="/reset/:token" component={SignUp} />   
  </Switch>
);

export default Routes;
