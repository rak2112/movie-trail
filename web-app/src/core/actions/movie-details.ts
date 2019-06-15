// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { MovieDetail } from '../interfaces';

const app = '[movieBase]';
export const LOAD_MOVIE_DETAILS = `${app} load movie details`;
export const LOAD_MOVIE_DETAILS_FAILURE = `${app} load movie details failure`;
export const LOAD_MOVIE_DETAILS_SUCCESS = `${app} load movie details success`;
export const RESET_MOVIE_DETAILS = `${app} reset movie details`;

export const loadMovieDetail = (id: number): LoadMovieDetail => ({
  id,
  type: LOAD_MOVIE_DETAILS
});

export const loadMovieDetailSuccess = (res: MovieDetail): LoadMovieDetailSuccess => ({
  res,
  type: LOAD_MOVIE_DETAILS_SUCCESS
});

export const resetDetails = () => ({
  type: RESET_MOVIE_DETAILS
});

export class LoadMovieDetail implements Action {
  readonly type = LOAD_MOVIE_DETAILS;
  constructor(public readonly id: number) {}
}

export class LoadMovieDetailSuccess implements Action {
  readonly type = LOAD_MOVIE_DETAILS_SUCCESS;
  constructor(public readonly res: MovieDetail) {}
}

export type MovieDetailAction = 
  | LoadMovieDetailSuccess;