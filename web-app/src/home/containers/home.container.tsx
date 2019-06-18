
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { HomeComponent } from '../components/home.component';

import { loadGenres, loadMovies } from '../../core/actions';
import { Movies } from '../../core/interfaces';
import { getPosterProps } from '../../core/selectors';



interface Props {
  api: {};
  movies: Movies;
  loadMovies: (pageNo: number) => void;
};

const Home = (props: Props) => <HomeComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const props = getPosterProps(state);
  return { ...props };
};

export default connect( mapStateToProps, {
  loadGenres,
  loadMovies
})(Home);