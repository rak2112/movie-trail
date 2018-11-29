import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Router } from 'react-router-dom';
import { rootEpic } from './core/epics/rootEpic';
import Routes, { history } from './core/routes';
import registerServiceWorker from './registerServiceWorker';

import Error from './core/containers/error';
import configureStore, { epicMiddleware } from './core/store/configureStore';
import { httpFactory } from './core/utils';
import TopMenu from './top-menu/dashboard.container';
// import './index.css';
// import './styles.scss';
// import * as serviceWorker from './serviceWorker';

export const store = configureStore();
export const http = httpFactory(store);
epicMiddleware.run(rootEpic);
// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(store);

// store.subscribe(()=> {
//   saveUserState(store.getState())
// });

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