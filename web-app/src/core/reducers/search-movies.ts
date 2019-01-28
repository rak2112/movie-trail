import * as actions from '../actions';
import { Movie } from '../interfaces';


export type SerachMoviesState = Movie[] | null;

export const searchedMovies = ( state: SerachMoviesState =  null, action: actions.SearchMovieAction): SerachMoviesState => {
  if(action.type === actions.SEARCH_MOVIES_SUCESS) {
    return action.res;
  }
  return state;
};
