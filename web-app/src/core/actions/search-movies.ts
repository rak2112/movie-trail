// tslint:disable:max-classes-per-file
import { Action } from 'redux';
import { Movie } from '../interfaces';

const app = '[movieBase]';
export const SEARCH_MOVIES = `${app} search movies`;
export const SEARCH_MOVIES_SUCESS = `${SEARCH_MOVIES} success`;


export const searchMovies = (movie: string): SearchMovies => ({type: SEARCH_MOVIES, movie});

export const searchMoviesSuccess = (res: Movie[]): SearchMoviesSuccess => ({
  res,
  type: SEARCH_MOVIES_SUCESS
});

export class SearchMovies implements Action {
  readonly type= SEARCH_MOVIES;
  constructor(public readonly movie: string) {}
}

export class SearchMoviesSuccess implements Action {
  readonly type= SEARCH_MOVIES_SUCESS;
  constructor(public readonly res: Movie[]) {}
}

export type SearchMovieAction =
  | SearchMoviesSuccess;