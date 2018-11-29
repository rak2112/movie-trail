import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { api, ApiState } from './api';
import { genres, GenresState } from './genres';
import { moviesReducer, MoviesState } from './movies';
import { userReducer } from './user';


export interface State {
  readonly api: ApiState;
  readonly genres: GenresState
  readonly moviesReducer: MoviesState;
}

const rootReducer = combineReducers({
  api,
  form: formReducer,
  genres,
  movies: moviesReducer,
  routing: routerReducer,
  user: userReducer
});

export default rootReducer;