import React from 'react';
import { connect, MapStateToProps, useSelector } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovies, reset, searchMovies } from '../core/actions';
import { LoadingCompWrapper } from '../core/components/loader-wrapper';
import { Api, GenresMap, Movie, Movies, UserMovieMap } from '../core/interfaces';
import { State } from '../core/reducers/index';
import { getMoviesProps } from '../core/selectors';
import { MoviesComponent } from './dashboard.component';

export interface StateProps {
  api? : Api;
  genres: GenresMap;
  movies: Movies;
  userMovies: UserMovieMap;
}

interface DispatchProps {
  addMovie: (movie: Movie) => void;
  search: (movie: string) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  loadMovies: (pageNo: number) => void;
}

export type MoviesProps = StateProps & DispatchProps;

const LoadMoviesList = LoadingCompWrapper(MoviesComponent);


export const MoviesPage = (props: MoviesProps) => <LoadMoviesList {...props}/>


const mapStateToProps: MapStateToProps<any, any, any> = (state: State) => {
  const movies = getMoviesProps(state);
  return { ...movies };
};

const search = (movie: string) => {
  if(movie) {
    return searchMovies(movie);
  }
  return reset();
}

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  addMovie,
  deleteMovie,
  loadMovies,
  loadGenres,
  search
}) (MoviesPage);