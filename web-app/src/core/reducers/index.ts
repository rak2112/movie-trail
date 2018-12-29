import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import { api, ApiState } from './api';
import { genres, GenresState } from './genres';
import { movieDetails, MovieDetailState } from './movie-details';
import { movies, MoviesState } from './movies';
import { user, UserState } from './user';


export interface State {
  readonly api: ApiState;
  readonly genres: GenresState
  readonly movieDetails: MovieDetailState;
  readonly movies: MoviesState;
  readonly user: UserState;
}

const rootReducer = combineReducers({
  api,
  form: formReducer,
  genres,
  movieDetails,
  movies,
  routing: routerReducer,
  user
});

export default rootReducer;