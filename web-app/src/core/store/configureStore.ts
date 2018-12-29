import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import { loadState } from '../utils';

const persistedState = {
  genres: loadState('genres'),
  user: loadState('user')
};


console.log('persistedState', persistedState);
export const epicMiddleware = createEpicMiddleware();
export default function configureStore() {
  const store = createStore(rootReducer, persistedState, composeWithDevTools( applyMiddleware(epicMiddleware)));
  return store;
}