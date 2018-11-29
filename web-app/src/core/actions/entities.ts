// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { Genre, Movies } from '../interfaces';
import { loadState } from '../utils';


const app = '[movieBase]';
export const LOAD_MOVIES = `${app} load movies`;
export const LOAD_GENRES = `${app} load genres`;
export const LOAD_GENRES_MOVIES = `${app} load genres and movies`;
export const LOAD_GENRES_SUCESS = `${LOAD_GENRES} success`;
export const LOAD_MOVIES_SUCESS = `${LOAD_MOVIES} success`;

export const loadMovies = (pageNo: number): LoadMovies => ({ type: LOAD_MOVIES, pageNo });

export const loadGenres = (): LoadGenres | {}  => {
  const genres = loadState('genres');
  if(!genres) {
    return { type: LOAD_GENRES };
  }
  return { type: 'dumy'};
};

export const loadMoviesGenres = (pageNo: number): LoadMoviesGenres => ({ type: LOAD_GENRES_MOVIES, pageNo });
export const loadGenresSuccess = (res: Genre[]): LoadGenresSuccess => ({
  res,
  type: LOAD_GENRES_SUCESS
});

export const loadMoviesSuccess = (res: Movies): LoadMoviesSuccess => ({
  res,
  type: LOAD_MOVIES_SUCESS
});


export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
  constructor(public readonly pageNo: number) {}
}

export class LoadGenres implements Action {
  readonly type = LOAD_GENRES;
}

export class LoadMoviesGenres implements Action {
  readonly type = LOAD_GENRES_MOVIES;
  constructor(public readonly pageNo: number) {}
}

export class LoadGenresSuccess implements Action {
  readonly type = LOAD_GENRES_SUCESS;
  constructor(public readonly res: Genre[]) {}
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES;
  constructor(public readonly res: Movies) {}
}

export type MovieAction =
  | LoadMoviesSuccess;

export type GenreAction = 
  | LoadGenresSuccess;