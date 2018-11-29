import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { getMovieGenres } from 'src/core/selectors';
import { loadGenres, loadMovies } from '../core/actions';
import { MoviesComponent } from './dashboard.component';

import { StateProps } from '../core/interfaces';


const Movies = (props: StateProps) => <MoviesComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  // console.log('contianer movies--->', state);
  const { movies, api } = state;
  return {
    api,
    movies,
    genres: getMovieGenres(state)
  }
};

export default connect<StateProps>(mapStateToProps, {
  loadMovies,
  loadGenres
}) (Movies);