// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { Genre, Movie, Movies } from '../interfaces';
import { loadState } from '../utils';


const app = '[movieBase]';
export const LOAD_MOVIES = `${app} load movies`;
export const LOAD_POSTERS = `${app} load posters`;
export const LOAD_USER_MOVIES = `${app} load user movies`;
export const LOAD_GENRES = `${app} load genres`;
export const LOAD_GENRES_MOVIES = `${app} load genres and movies`;
export const LOAD_GENRES_SUCESS = `${LOAD_GENRES} success`;
export const LOAD_MOVIES_SUCESS = `${LOAD_MOVIES} success`;
export const LOAD_USER_MOVIES_SUCESS = `${LOAD_USER_MOVIES} success`;

export const ADD_USER_MOVIE = `${app} add user movie`;
export const DELETE_USER_MOVIE = `${app} delete user movie`;

export const addMovie = (movie: Movie): AddMovie => ({type: ADD_USER_MOVIE, movie});
export const deleteMovie = (movie: Movie): DeleteMovie => ({type: DELETE_USER_MOVIE, movie});

export const loadMovies = (pageNo: number): LoadMovies => ({ type: LOAD_MOVIES, pageNo });


export const loadUserMovies = (): LoadUserMovies  => ({ type: LOAD_USER_MOVIES});

export const loadGenres = (): LoadGenres | {}  => {
  const genres = loadState('genres');
  if(!genres) {
    return { type: LOAD_GENRES };
  }
  return { type: 'DUMY'};
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


export class AddMovie implements Action {
  readonly type= ADD_USER_MOVIE;
  constructor(public readonly movie: Movie) {}
}

export class DeleteMovie implements Action {
  readonly type= DELETE_USER_MOVIE;
  constructor(public readonly movie: Movie) {}
}

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
  constructor(public readonly pageNo: number) {}
}

export class LoadUserMovies implements Action {
  readonly type = LOAD_USER_MOVIES;
}

export class LoadUserMoviesSuccess implements Action {
  readonly type = LOAD_USER_MOVIES_SUCESS;
  constructor(public readonly res: Movies) {}
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
  readonly type = LOAD_MOVIES_SUCESS;
  constructor(public readonly res: Movies) {}
}

export type MovieAction =
  | LoadMoviesSuccess;

export type GenreAction = 
  | LoadGenresSuccess;