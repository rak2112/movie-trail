import { ofType } from 'redux-observable';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions';
import { Movies } from '../interfaces';
import * as service from '../utils';

export const searchMovies = (action$: any) => action$.pipe (
  ofType(actions.SEARCH_MOVIES),
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(({movie}) =>
  service.searchMovies(movie).pipe(
    map((res: any) => {
      // return actions.loadMoviesSuccess(res);
      return actions.loadMoviesSuccess({
        ...res,
        results: res.results.filter((searchedMovie: any) => searchedMovie.media_type === 'movie')
      })
    })
  ))
);