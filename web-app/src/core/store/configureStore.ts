import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from '../reducers';
import { loadState } from '../utils';
// import { MiddlewareFn } from 'redux'
// type Actions = ... // all action unions
// type State = ... // all substores unions
// const actionToPlainObject: MiddlewareFn<State, Actions> = store => next => action => {
//   if (isObjectLike(action)) {
//     return next({ ...action })
//   }
//   throw new Error(`action must be an object: ${debug(action)}`)
// }
// function isObjectLike(val: any): val is {} {
//  return isPresent(val) && typeof val === 'object'
// }
// function isPresent(obj: any): obj is Present {
//  return obj !== undefined && obj !== null
// }
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