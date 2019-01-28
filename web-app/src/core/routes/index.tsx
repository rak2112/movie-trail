import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import Movies from '../../all-movies/dashboard.container';
import Latest from '../../latest/dashboard';
import UpComing from '../../upComing/dashboard';

import Home from '../../home/containers/home.container';
import Details from '../../movie-details/dashboard.container';
import Login from '../../user/login/dashboard.container';
import PasswordRest from '../../user/password-request/dashboard.container';
import Profile from '../../user/profile/container';
import SignUp from '../../user/sign-up/dashboard.container';

import TopMenu from '../../top-menu/dashboard.container';
// import Latest from './components/Latest';
// import Popular from './components/Popular';

// import UpComing from './components/UpComing';
// import Details from './containers/Details'; // eslint-disable-line import/no-named-as-default

// import NotFoundPage from './components/NotFoundPage.js';


export const history = createHistory()

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/home" component={Home}/>
    <Route path="/movies/:pageNo?" component={Movies}/>
    <Route path="/latest/:pageNo?" component={Latest}/>
    <Route path="/up-coming/:pageNo?" component={UpComing}/>
    <Route path="/movie-details/:id" component={Details}/>    
    <Route path="/profile" component={Profile}/>   
    <Route path="/login" component={Login}/>   
    <Route path="/register" component={SignUp}/>   
    <Route path="/password-reset" component={PasswordRest}/>   
    <Route path="/reset/:token" component={SignUp}/>
  </Switch>
);

export default Routes;
