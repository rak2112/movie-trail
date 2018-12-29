import * as actions from '../actions';
import { Movies } from '../interfaces';


export type MoviesState = Movies | null;

export const movies = ( state: MoviesState =  null, action: actions.MovieAction): MoviesState => {
  if(action.type === actions.LOAD_MOVIES_SUCESS) {
    return action.res;
  }
  return state;
};
