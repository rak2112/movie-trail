import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovies } from '../core/actions';
import { LoadingCompWrapper } from '../core/components';
import { Api, Genre, Movie, Movies, UserMovieMap,  } from '../core/interfaces';
import {State} from '../core/reducers';
import { getMoviesProps} from '../core/selectors';
import { MoviesComponent } from './dashboard.component';

interface StateProps {
  api? : Api;
  genres: Genre[];
  movies: Movies;
  userMovies: UserMovieMap;
}

interface DispatchProps {
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  loadMovies: (pageNo: number) => void;
}

export type MoviesProps = StateProps & DispatchProps;

const LoadMoviesList = LoadingCompWrapper(MoviesComponent);

const Movies = (props: MoviesProps) => <LoadMoviesList {...props}/>

const mapStateToProps: MapStateToProps<any, any, any> = (state: State) => {
  const movies = getMoviesProps(state);
  return { ...movies };
};

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  addMovie,
  deleteMovie,
  loadMovies,
  loadGenres
}) (Movies);