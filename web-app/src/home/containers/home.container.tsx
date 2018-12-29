
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { HomeComponent } from '../components/home.component';

import { loadGenres, loadMovies } from '../../core/actions';
import { Movies } from '../../core/interfaces';
import { getMovieGenres } from '../../core/selectors/movies';



interface Props {
  api: {};
  movies: Movies;
  loadMovies: (pageNo: number) => void;
};

const Home = (props: Props) => <HomeComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const { movies, api } = state;
  return {
    api,
    movies,
    genres: getMovieGenres(state)
  }
};

export default connect( mapStateToProps, {
  loadGenres,
  loadMovies
})(Home);