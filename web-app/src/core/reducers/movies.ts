import * as actions from '../actions';
import { Movies } from '../interfaces';


export type MoviesState = Movies;
const initialState = { pageNo:0, totalPages: 0, results: [], totalResults: 0 };

export const moviesReducer = ( state: Movies =  initialState, action: actions.MovieAction): Movies => {
  if(action.type === actions.LOAD_MOVIES_SUCESS) {
    return action.res;
  }
  return state;
};
