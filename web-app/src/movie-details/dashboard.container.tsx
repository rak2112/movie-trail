import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovieDetail } from '../core/actions';
import {
  getMovieDetails,
  getMovieImages,
  getMoviePersons,
  getMovieVideos, 
  getUserMoviesMap
} from '../core/selectors';
import { MovieDetailsComponent } from './dashboard.component';
import { LoadingComponent } from './loader.container';

import { Api, Genre, Movie, Movies, User, UserMovieMap,  } from '../core/interfaces';

export interface Props {
  api? : Api;
  genres: Genre[];
  userMovies: UserMovieMap;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  loadUserMovies: () => void;
  loadMovieDetail: (id: number) => void;
};

const LoadMovieDetails = LoadingComponent(MovieDetailsComponent);

const Details = (props: Props) => <LoadMovieDetails {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const { api } = state;
  return {
    api,
    details: getMovieDetails(state),
    persons: getMoviePersons(state),
    images: getMovieImages(state),
    videos: getMovieVideos(state),
    userMovies: getUserMoviesMap(state)
  }
};

export default connect<Movies>(mapStateToProps, {
  addMovie,
  deleteMovie,
  loadMovieDetail,
  loadGenres
}) (Details);