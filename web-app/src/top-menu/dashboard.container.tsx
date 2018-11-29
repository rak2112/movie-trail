
import React, { Component } from 'react';
import { connect, MapStateToProps } from 'react-redux';

import { logoutRequest } from '../core/actions/';
import { StateProps, User, UserMovie } from '../core/interfaces';
import { MenuBar } from './menu-bar.component';


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
  user: User
  movies?: UserMovie[]
  logoutRequest: () => void;
}
const TopMenu = (props: MenuBarProps) => <MenuBar {...props}/>
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch: dispatch,
//     onFocusOut() {
//       let { dispatch } = this.props;
//       this.setState({movieToFind: ''});
//       dispatch(resetQuickSearch());
//     },
//     updateSearch() {
//       let { dispatch } = this.props;
//       if(this.state.movieToFind) {
//         dispatch(searchMovies(this.state.movieToFind));
//       }
//       else {
//         dispatch(resetQuickSearch());
//       }
//     },
//     handleNameChange: function(event) {
//       event.persist();
//       this.setState({ movieToFind: event.target.value }, this.props.updateSearch);
//     }
//   };
// }

const mapStateProps:MapStateToProps <any, any, any> = (state: MenuBarProps) =>{
  const { user } = state;
  return {
    user
  };
  // const { movies } = state;
  // return {movies};
  // const { moviesFound } = searchedMovies;
  // return {
  //   moviesFound
  // };
}

export default connect<MenuBarProps>(mapStateProps, {
  logoutRequest
}) (TopMenu);
