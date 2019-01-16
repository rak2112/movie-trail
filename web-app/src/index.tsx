import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';

import Routes, { history } from './core/routes';
import registerServiceWorker from './registerServiceWorker';

import { store } from './app';

import Error from './core/containers/error';
import { rootEpic } from './core/epics/rootEpic';
import { epicMiddleware } from './core/store/configureStore';
import TopMenu from './top-menu/dashboard.container';



epicMiddleware.run(rootEpic);

render (
  <Provider store={store}>
    <Router history={history}>
      <Fragment>
        <TopMenu/>
        <Error/>
        <Routes/>
      </Fragment>
    </Router>
  </Provider>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

registerServiceWorker();