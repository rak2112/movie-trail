import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie, loadGenres, loadMovies } from '../../core/actions';
import { Genre, User, UserMovie, UserMovieMap } from '../../core/interfaces';
import { 
  getFavoriteMovies,
  getMovieGenres,
  getUserMoviesMap,
  getWatchListMovies
} from '../../core/selectors';

import { ProfileComponent } from './component';

export interface Profile {
  favorites: UserMovie[];
  genres: Genre[];
  user: User;
  userMovies: UserMovieMap;
  watchlist: UserMovie[];
  addMovie: (movie: UserMovie) => void;
  deleteMovie: (movie: UserMovie) => void;
};

const Profile = (props: Profile) => <ProfileComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state) => {
  const { api, user } = state;
  return {
    api,
    user, // :TODO selector for profile
    favorites: getFavoriteMovies(state),
    genres: getMovieGenres(state),
    userMovies: getUserMoviesMap(state),
    watchlist: getWatchListMovies(state)
    
  }
};

export default connect<Profile>(mapStateToProps, {
  addMovie,
  deleteMovie,
  loadMovies,
  loadGenres
}) (Profile);