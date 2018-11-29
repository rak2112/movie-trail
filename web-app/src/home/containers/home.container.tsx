
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { HomeComponent } from '../components/home.component';

import { loadMovies } from '../../core/actions';
import { Movies } from '../../core/interfaces';

interface Props {
  api: {};
  movies: Movies;
  loadMovies: (pageNo: number) => void;
};

const Home = (props: Props) => <HomeComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  // console.log('state', state);
  const { movies, api } = state;
  return {
    api,
    movies
  }
};

export default connect( mapStateToProps, {
  loadMovies
})(Home);