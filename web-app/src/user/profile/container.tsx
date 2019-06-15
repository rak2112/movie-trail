import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { addMovie, deleteMovie } from '../../core/actions';
import { Genre, User, UserMovie, UserMovieMap } from '../../core/interfaces';
import { State } from '../../core/reducers/index';
import { getProfileProps } from '../../core/selectors';
import { ProfileComponent } from './component';

interface StateProps {
  favorites: UserMovie[];
  genres: Genre[];
  user: User;
  userMovies: UserMovieMap;
  watchlist: UserMovie[];
};

interface DispatchProps {
  addMovie: (movie: UserMovie) => void;
  deleteMovie: (movie: UserMovie) => void;
};
export type Profile = StateProps & DispatchProps;

const Profile = (props: Profile) => <ProfileComponent {...props}/>

const mapStateToProps: MapStateToProps <any, any, any> = (state: State) => {
  const props = getProfileProps(state);
  return { ...props };
};

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  addMovie,
  deleteMovie,
}) (Profile);