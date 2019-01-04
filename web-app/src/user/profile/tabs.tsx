import React from 'react';
import { Nav, NavItem, Tab, Tabs } from 'react-bootstrap';
import * as uuid from 'uuid/v4';

import { MovieComponent } from '../../core/components';
import { UserMovie } from '../../core/interfaces';
import { Profile } from './container';
import { TabContainer } from './tab-styled.component';

const getUuid = () => {
  return uuid();
};

export const MovieTabs = ({
    addMovie,
    deleteMovie,
    favorites,
    genres,
    userMovies,
    watchlist
  }: Profile) => {
  return (
    <TabContainer>
    <Tabs defaultActiveKey={(favorites.length) ? 'fav': 'watchlist'} id="movie-tabs">
      <Nav bsStyle="tabs">       
        <NavItem eventKey="fav">
          <span className="glyphicon glyphicon-heart"/>
          Favorites
          <span> {(favorites.length> 0) && `(${favorites.length})`} </span>
        </NavItem>

        <NavItem eventKey="watchlist">
          <span className="glyphicon glyphicon-bookmark"/>
          Watchlist
          <span> {(watchlist.length > 0 )&& `(${watchlist.length})`} </span>
        </NavItem>
      </Nav>
      <Tab
        eventKey={'fav'}
        >
        {
          (favorites.length) ? 
            favorites.map((movie: UserMovie) => 
              <MovieComponent 
                key={getUuid()}
                movie={movie} 
                genres={genres}
                userView={'Favorites'}
                userMovies={userMovies}
                addMovie={addMovie} 
                deleteMovie={deleteMovie}/>)
          : (<h3 className='no-records'>You have not added any movies yet.</h3>)
        }
      </Tab>
      <Tab eventKey={'watchlist'} >
        { 
          (watchlist.length) ? 
            watchlist.map((movie: UserMovie) => 
              <MovieComponent 
                key={getUuid()}
                movie={movie} 
                genres={genres}
                userView={'Watchlist'}
                userMovies={userMovies}
                addMovie={addMovie} 
                deleteMovie={deleteMovie}/>)
          : (<h3 className='no-records'>You have not added any movies yet.</h3>)      
        }
      </Tab>
    </Tabs>
  </TabContainer>
  )
}