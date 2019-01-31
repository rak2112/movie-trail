import { toast } from "react-toastify";
import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { of } from 'rxjs';

import * as actions from '../actions';
import { Genre, Movies } from '../interfaces';
import { history } from '../routes';
import * as service from '../utils';

export const loadMovies = (action$: any) => action$.pipe (
  ofType(actions.LOAD_ALL_MOVIES),
  switchMap(({pageNo}) =>
  service.getMovies(pageNo).pipe(
    map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo }) )
  )),
  tap(({res})=> {
    const { pageNo } = res;
    const redirection = (/^\/home/gi).test(history.location.pathname);
    if(!redirection) {
      history.push(`/movies/${+pageNo}`)
    }
  })
);

export const loadLatestMovies = (action$: any) => action$.pipe (
  ofType(actions.LOAD_LATEST_MOVIES),
  switchMap(({pageNo}) =>
  service.getLatestMovies(pageNo).pipe(
    map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo }) )
  )),
  tap(({res})=> {
    const { pageNo } = res;
    const redirection = (/^\/home/gi).test(history.location.pathname);
    if(!redirection) {
      history.push(`/latest/${+pageNo}`)
    }
  })
);

export const loadUpcomingMovies = (action$: any) => action$.pipe (
  ofType(actions.LOAD_UPCOMING_MOVIES),
  switchMap(({pageNo}) =>
  service.getUpcomningMovies(pageNo).pipe(
    map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo }) )
  )),
  tap(({res})=> {
    const { pageNo } = res;
    const redirection = (/^\/home/gi).test(history.location.pathname);
    if(!redirection) {
      history.push(`/up-coming/${+pageNo}`)
    }
  })
);

export const loadHitMovies = (action$: any) => action$.pipe (
  ofType(actions.LOAD_HIT_MOVIES),
  switchMap(({pageNo}) =>
  service.getHits(pageNo).pipe(
    map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo }) )
  )),
  tap(({res})=> {
    const { pageNo } = res;
    const redirection = (/^\/home/gi).test(history.location.pathname);
    if(!redirection) {
      history.push(`/hits/${+pageNo}`)
    }
  })
);

export const loadUserMovies = (action$: any, state$: any) => action$.pipe (
  ofType(actions.LOAD_USER_MOVIES),
  withLatestFrom(state$),
  switchMap(([{pageNo}, {user}]) =>
    service.getUserMovies().pipe(
      map((res) => {
        const userStatus = service.loadState('user') || {};
        const newState = JSON.parse(JSON.stringify(userStatus));
        newState.movies = res;
        newState.displayName = userStatus.displayName;
        newState.loggedIn = userStatus.loggedIn;
        service.saveState('user', newState);
        return actions.loginRequestSuccess(newState);
      })
    )
  ),
  catchError(err => {
    if(err.status === 401) {
      service.saveState('user', null);
      return of(actions.logoutRequestSuccess());
    }
    return of(actions.apiError(service.appErrors.apiError));
  })
);

export const loadGenres = (action$: any) => action$.pipe (
  ofType(actions.LOAD_GENRES),
  switchMap(({pageNo}) => 
    forkJoin(
      // getMovies(pageNo).pipe(
      //   map((res: Movies) => actions.loadMoviesSuccess({ ...res, pageNo}) )
      // ),
      service.getGenres().pipe(
        map((res: Genre[]) => {
          service.saveState('genres', res);
          return actions.loadGenresSuccess(res);
        })
      )
    ).pipe(switchMap(action => action))
  )
);

export const addMovie = (actions$: any, state$: any) => actions$.pipe (
  ofType(actions.ADD_USER_MOVIE),
  withLatestFrom(state$),
  switchMap(([{ movie }, { user }]) => {
    return service.addMovieCollection(movie).pipe(
      map(( {id}: {id: string}) => {
        const newUserState = JSON.parse(JSON.stringify(user));
        newUserState.movies.push({...movie, _id: id});
        service.saveState('user', newUserState);
        return actions.loginRequestSuccess(newUserState);
      })
    )
  }),
  tap(() => toast.success("Movie added to your list")),
  catchError(err => of(actions.apiError(service.appErrors.apiError)))
);

export const deleteMovie = (actions$: any, state$: any) => actions$.pipe (
  ofType(actions.DELETE_USER_MOVIE),
  withLatestFrom(state$),
  switchMap(([{ movie }, { user }]) => {
    return service.deleteMovie(movie.id).pipe(
      map(() => {
        const newUserState = JSON.parse(JSON.stringify(user));
        const movies = newUserState.movies.filter( ({_id: id}: {_id: string}) => id !== movie.id);
        service.saveState('user', {...newUserState, movies});
        return actions.loginRequestSuccess({...newUserState, movies});
      })
    )
  }),
  tap(() => toast.success('Movie removed from your list')),
  catchError(err => of(actions.apiError(service.appErrors.apiError))) // 
);