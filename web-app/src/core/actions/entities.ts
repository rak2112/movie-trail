// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { Genre, Movie, Movies, UserMovie } from '../interfaces';
import { loadState } from '../utils/localStorage';

import { history } from '../routes';

const app = '[movieBase]';
export const LOAD_MOVIES = `${app} load movies`;
export const RESET_MOVIES = `${app} reset movies`;
export const LOAD_ALL_MOVIES = `${app} load all movies`;
export const LOAD_LATEST_MOVIES = `${app} load latest movies`;
export const LOAD_HIT_MOVIES = `${app} load hit movies`;
export const LOAD_UPCOMING_MOVIES = `${app} load upcoming movies`;
export const LOAD_HITS_MOVIES = `${app} load hits movies`;
export const LOAD_POSTERS = `${app} load posters`;
export const LOAD_USER_MOVIES = `${app} load user movies`;
export const LOAD_GENRES = `${app} load genres`;
export const LOAD_GENRES_MOVIES = `${app} load genres and movies`;
export const LOAD_GENRES_SUCESS = `${LOAD_GENRES} success`;
export const LOAD_MOVIES_SUCESS = `${LOAD_MOVIES} success`;
export const LOAD_USER_MOVIES_SUCESS = `${LOAD_USER_MOVIES} success`;

export const ADD_USER_MOVIE = `${app} add user movie`;
export const DELETE_USER_MOVIE = `${app} delete user movie`;

export const addMovie = (movie: UserMovie): AddMovie => ({type: ADD_USER_MOVIE, movie});
export const deleteMovie = (movie: UserMovie): DeleteMovie => ({type: DELETE_USER_MOVIE, movie});

// export const loadMovies = (pageNo: number): LoadMovies => ({ type: LOAD_MOVIES, pageNo });
const requiredAction = (route: string, pageNo: number) => {
  switch( route ) {
    case 'movies':
      return { type: LOAD_ALL_MOVIES, pageNo };
    case 'latest':
      return { type: LOAD_LATEST_MOVIES, pageNo };
    case 'up-coming':
      return { type: LOAD_UPCOMING_MOVIES, pageNo };
    case 'hits':
      return { type: LOAD_HIT_MOVIES, pageNo };
    default:
      return { type: LOAD_ALL_MOVIES, pageNo };
  }
};

export const loadMovies = (pageNo: number): LoadMovies => {
  
  const { pathname } = history.location;
  const route = pathname.split('/');
  return requiredAction(route[1], pageNo);
};

export const loadUserMovies = (): LoadUserMovies  => ({ type: LOAD_USER_MOVIES});

export const loadGenres = (): LoadGenres | {}  => {
  const genres = loadState('genres');
  if(!genres) {
    return { type: LOAD_GENRES };
  }
  return { type: 'DUMY'};
};

export const reset = () => {
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

export const resetMovies = (): ResetMovies => ({
  type: RESET_MOVIES
});


export class AddMovie implements Action {
  readonly type= ADD_USER_MOVIE;
  constructor(public readonly movie: UserMovie) {}
}

export class DeleteMovie implements Action {
  readonly type= DELETE_USER_MOVIE;
  constructor(public readonly movie: UserMovie) {}
}

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
  constructor(public readonly pageNo: number) {}
}

export class ResetMovies implements Action {
  readonly type = RESET_MOVIES;
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