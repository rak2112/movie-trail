import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovieDetail, loadUserMovies, resetDetails } from '../core/actions';
import {State} from '../core/reducers/index';
import {
  getMovieDetailProps
} from '../core/selectors';
import { MovieDetailsComponent } from './dashboard.component';
import { LoadingComponent } from './loader.container';

import { Api, Genre, Movie, MovieDetail, UserMovieMap,  } from '../core/interfaces';

interface StateProps extends MovieDetail{
  api? : Api;
  genres: Genre[];
  userMovies: UserMovieMap;
}

interface DispatchProps {
  addCollection: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  resetDetails: () => void;
  loadMovieDetail: (id: number) => void;
  loadUserMovies: () => void;
}


export type DetailProps = StateProps & DispatchProps;  

const LoadMovieDetails = LoadingComponent(MovieDetailsComponent);

const Details = (props: DetailProps) => <LoadMovieDetails {...props}/>

const addCollection = (movie: Movie) => {
  const genres = movie.genres.map(({id}: {id: number}) => id);
  return addMovie({...movie, genre_ids: genres });
};

const mapStateToProps: MapStateToProps <any, any, any> = (state: State) => {
  const details = getMovieDetailProps(state);
  return { ...details };
};

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  addCollection,
  deleteMovie,
  loadMovieDetail,
  loadUserMovies,
  loadGenres,
  resetDetails
}) (Details);
