import * as actions from '../actions';
import { Movies } from '../interfaces';

export const intitialMovieState = {
  results: [{
    id: 0,
    backdrop_path: '',
    genre_ids: [],
    genres: [],
    homepage: '',
    overview: '',
    poster_path: '',
    runtime: '',
    release_date: '',
    spoken_languages: [],
    status: '',
    title: '',
    vote_average: ''
  }],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
}
export type MoviesState = Movies | null;

export const movies = ( state: MoviesState = intitialMovieState, action: actions.MovieAction): MoviesState => {
  if(action.type === actions.LOAD_MOVIES_SUCESS) {
    return action.res;
  }

  if(action.type === actions.RESET_MOVIES) {
    return intitialMovieState;
  }
  return state;
};
