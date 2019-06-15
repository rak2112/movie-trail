import * as actions from '../actions';
import { Genre } from '../interfaces';

export type GenresState = Genre[] | null;

export const genres = ( state: GenresState = [], action: actions.GenreAction): GenresState => {
  if(action.type === actions.LOAD_GENRES_SUCESS) {
    return action.res;
  }
  return state;
};
