import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import * as actions from '../actions';
import { Genre, Movies } from '../interfaces';
import { history } from '../routes';
import * as service from '../utils';

export const searchMovies = (action$: any) => action$.pipe (
  ofType(actions.SEARCH_MOVIES),
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(({movie}) =>
  service.searchMovies(movie).pipe(
    map((res: any) => { console.log('searchMovies', res); 
    // const movies = res.results.filter((item: any) => item.type === 'movie');
    // res.results = movies;
    res.totalPages = res.total_pages;
    console.log('resss filtered movies', res);
    return actions.loadMoviesSuccess(res)} )
  ))
);