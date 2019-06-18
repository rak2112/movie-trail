import React from 'react';
import { useStore } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history'

// import Home from '../../home/containers/home.container';
import Details from '../../movie-details/dashboard.container';
import Login from '../../user/login/dashboard.container';
import PasswordRest from '../../user/password-request/dashboard.container';
import Profile from '../../user/profile/container';
import SignUp from '../../user/sign-up/dashboard.container';

import { MovieDetails } from '../../pages/details';
import { Hits } from '../../pages/hits';
import { Home } from '../../pages/home';
import { Latest } from '../../pages/latest';
import { AllMovies } from '../../pages/movies';
import { UpComing } from '../../pages/upComing';


export const history = createBrowserHistory()

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/home" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/movies/:pageNo?" component={AllMovies}/>
      <Route path="/latest/:pageNo?" component={Latest}/>
      <Route path="/hits/:pageNo?" component={Hits}/>
      <Route path="/up-coming/:pageNo?" component={UpComing}/>
      {/* <Route path="/movie-details/:id" component={Details}/>     */}
      <Route path="/movie-details/:id" component={MovieDetails}/>    
      <Route path="/profile" component={Profile}/>   
      <Route path="/login" component={Login}/>   
      <Route path="/register" component={SignUp}/>   
      <Route path="/password-reset" component={PasswordRest}/>   
      <Route path="/reset/:token" component={SignUp}/>
      <Redirect from="/" to="/home" />
    </Switch>
  );
}

export default Routes;
