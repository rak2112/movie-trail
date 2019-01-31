
import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { logoutRequest, reset, searchMovies } from '../core/actions/';
import { User, UserMovie } from '../core/interfaces';
import { MenuBar } from './dashboard.component';


export interface MenuBarProps {
  user: User;
  movies?: UserMovie[];
  searchTerm: string;
  search: () => void;
  logoutRequest: () => void;
}
const TopMenu = (props: MenuBarProps) => <MenuBar {...props}/>

const search = (movie: string) => {
  if(movie) {
    return searchMovies(movie);
  }
  return reset();
}

const mapStateProps: MapStateToProps <any, any, any> = (state: MenuBarProps) =>{
  const { user } = state;
  return {
    user
  };
}

export default connect<MenuBarProps>(mapStateProps, {
  logoutRequest,
  search
}) (TopMenu);
