import { createSelector } from 'reselect';

import { State } from '../reducers';

export const getGenres = (state: State) => state.genres;

export const getMovieGenres = createSelector(
  getGenres,
  (genres) => {
    if(genres) {
      return genres.reduce((genreRes, curr)=> {
        return {
          ...genreRes,
          [curr.id]: curr
        };
      }, {});
    }
    return genres;
  }
);