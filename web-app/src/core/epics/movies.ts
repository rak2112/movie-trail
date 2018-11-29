import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as actions from '../actions';
import { Genre, Movies } from '../interfaces';
import { getGenres, getMovies, saveState } from '../utils';

export const loadMoviesPostersEpic = (action$: any) => action$.pipe (
  ofType(actions.LOAD_MOVIES),
  switchMap(({pageNo}) =>
    getMovies(pageNo).pipe(
      map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo}) )
    )
  )
);

export const loadMoviesEpic = (action$: any) => action$.pipe (
  ofType(actions.LOAD_GENRES),
  switchMap(({pageNo}) => 
    forkJoin(
      // getMovies(pageNo).pipe(
      //   map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo}) )
      // ),
      getGenres().pipe(
        map((res: Genre[]) => {
          saveState('genres', res);
          return actions.loadGenresSuccess(res);
        })
      )
    ).pipe(switchMap(action => action))
  )
)