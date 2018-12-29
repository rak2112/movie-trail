
import { ofType } from "redux-observable";
import { forkJoin } from 'rxjs';
import { catchError, ignoreElements, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import { MovieDetail } from '../interfaces';
import * as service from '../utils';

export const loadMovieDetails = (action$: any) => action$.pipe (
  ofType(actions.LOAD_MOVIE_DETAILS),
  switchMap(({id}) =>
    forkJoin(
      service.getMovieDetails(id),
      service.getMovieImages(id),
      service.getMovieVideos(id),
      service.getMovieCast(id)
    ).pipe(switchMap(([details, images, videos, persons]: any) => {
      return [ actions.loadMovieDetailSuccess({
        details,
        images,
        videos,
        persons
      })];
    }))
  )
);
