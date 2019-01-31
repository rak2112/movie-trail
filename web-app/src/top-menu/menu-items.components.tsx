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
  }
`;

interface Props {
  user: User,
  logoutRequest: () => void;
}

export const MenuItemsComponent = ({user, logoutRequest}: Props) => {
  
  return(
    <Header>
      <nav className="navbar navbar-inverse">
        <ul>
          <li><NavLink to='/home'>Home</NavLink></li>
          <li><NavLink to='/movies'>All Movies</NavLink></li>
          <li><NavLink to='/latest'>Latest</NavLink></li>
          <li><NavLink to='/hits'>Hits</NavLink></li>
          <li><NavLink to='/up-coming'>Coming Soon</NavLink></li>
          { !user && <li className="float-right"><NavLink to='/login'>Sign in</NavLink></li> }
          { user && user.loggedIn &&
            <>
              <li className="float-right" ><a href="#" onClick={ logoutRequest }>Log out</a></li>
              <li className="float-right"><NavLink to='/profile'>Profile</NavLink></li>
            </>
          }
        </ul>
      </nav>
    </Header>
  )
};
