import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovies } from '../core/actions';
import { LoadingCompWrapper } from '../core/components';
import { getMovieGenres, getUserMoviesMap } from '../core/selectors';
import { MoviesComponent } from './dashboard.component';

import { Api, Genre, Movie, Movies, User, UserMovieMap,  } from '../core/interfaces';

export interface Movies {
  api? : Api;
  genres: Genre[];
  movies: Movies;
  user: User;
  userMovies: UserMovieMap;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  loadMovies?: (pageNo: number) => void;
};

const LoadMoviesList = LoadingCompWrapper(MoviesComponent);

const Movies = (props: Movies) => <LoadMoviesList {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const { movies, api } = state;
  return {
    api,
    movies,
    userMovies: getUserMoviesMap(state),
    genres: getMovieGenres(state)
  }
};

export default connect<Movies>(mapStateToProps, {
  addMovie,
  deleteMovie,
  loadMovies,
  loadGenres
}) (Movies);