import React, { Children } from 'react';
import styled from 'react-emotion';
import { Link, NavLink } from 'react-router-dom';
import { User } from '../core/interfaces';


const Header = styled('header')`
  nav {
    height: 40px;
    margin: 0;
    li {
      display: inline-block;
    }
    a {
      color: #cc3300;
      text-decoration: none;
      display: inline-block;
      padding: 10px 15px;
      margin-right: 20px; 
    }
    .float-right {
      float: right;
    }
    .nav-bar {
      border-radius: 0;
    }
    /* a.active {
      background: rgb(0, 0, 0);
      color: rgb(255, 92, 0);
      border-bottom: 4px solid;
      padding-bottom: 8px;
    } */
  }
`;

interface Props {
  user: User,
  logoutRequest: () => void;
}

export const MenuItemsComponent = ({user, logoutRequest}: Props) => {
  // return(
  //   <nav className="navbar navbar-inverse">
  //     {props.children()}
  //   </nav>
  // );

  return(
    <Header>
      <nav className="navbar navbar-inverse">
        <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/movies'>All Movies</NavLink></li>
          <li><NavLink to='/latest'>Latest</NavLink></li>
          <li><NavLink to='/popular'>Hits</NavLink></li>
          <li><NavLink to='/up-coming'>Coming Soon</NavLink></li>
          { !user && <li className="float-right"><NavLink to='/login'>Sign in</NavLink></li>}
          { user && <li className="float-right" ><a href="#" onClick={ logoutRequest }>Log out</a></li>}
          {/* <li><NavLink to='/up-coming'>User</NavLink></li> */}
        </ul>
      </nav>
    </Header>
  )
};