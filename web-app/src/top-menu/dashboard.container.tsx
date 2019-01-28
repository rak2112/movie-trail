
import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { dummyAction, logoutRequest, searchMovies } from '../core/actions/';
import { User, UserMovie } from '../core/interfaces';
import { MenuBar } from './dashboard.component';


// class TopMenu extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {menuData: menuData, movieToFind: ''};
//   }
//   render() {
//     return (
//     <div>
//       <MenuBar
//         data={this.state.menuData}
//         movieToFind={this.state.movieToFind}
//         moviesFound={this.props.moviesFound}
//         onFocusOut={this.props.onFocusOut.bind(this)}
//         clickHandler={this.props.handleNameChange.bind(this)}/>
//        {this.props.children}
//     </div>
//   );
//  }
// }

export interface MenuBarProps {
  user: User;
  movies?: UserMovie[];
  searchTerm: string;
  search: () => void;
  logoutRequest: () => void;
}
const TopMenu = (props: MenuBarProps) => <MenuBar {...props}/>

const search = (movie: string) => {
  console.log('event to be searched', movie);
  if(movie) {
    return searchMovies(movie);
  }
  return dummyAction();
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
