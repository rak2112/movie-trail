import * as actions from '../actions';
import { MovieDetail } from '../interfaces';


export type MovieDetailState = MovieDetail | null;

export const movieDetails = ( state: MovieDetailState =  null, action: actions.MovieDetailAction): MovieDetailState => {
  
  if(action.type === actions.LOAD_MOVIE_DETAILS_SUCCESS) {
    return action.res;
  }

  if(action.type === actions.RESET_MOVIE_DETAILS) {
    return null;
  }
  return state;
};
