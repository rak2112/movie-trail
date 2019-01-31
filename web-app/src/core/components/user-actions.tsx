import React from 'react';
import styled from 'react-emotion';

import { Movie, UserMovieMap, UserView } from '../interfaces';

const Container = styled('div')`
  /* padding: 3px 1px 5px; */
  .user-actions {
    text-align: end;
    background: #000;
    font-size: 22px;
    opacity: 0.9;
    text-align: right !important;
  }
  a {
    color: #cc3300;
    margin-right: 14px;
    cursor: pointer;
  }
  span.glyphicon-heart {
    font-size: 25px;
  }
  span.add-to-list {
      color: #fff;
  }
  span.rating {
    color: #cc0;
    padding-left: 10px;
    float: left;
    span {
      float: right;
      padding-left: 3px;
      top: 3px;
    }
  }
  span.year {
    padding-right: 102px;
  }
  span.glyphicon-calendar {
    padding-right: 7px;
  }
`;

export interface UserAction {
  movie: Movie;
  userMovies: UserMovieMap
  userView?: UserView;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
}

const getYear = (date: string) => new Date(date).getFullYear();

export const UserActions = ({addMovie, deleteMovie, movie, userView, userMovies}: UserAction) => {
  return (
    <Container>
     <div className="user-actions">
      <span className='rating'>{movie.vote_average}<span className="glyphicon glyphicon-star"/></span>
      { movie.release_date &&
        <span className='year'><span className="glyphicon glyphicon-calendar"/>{getYear(movie.release_date)}</span>
      }
      { userMovies.favorites[movie.id] &&
        <a title="Remove From Favorites"
          className="remove-from-favorites"
          onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.favorites[movie.id]._id})}>
          <span className="glyphicon glyphicon-heart"/>
        </a>
      }  
      { (!userMovies.favorites[movie.id] && userView !== 'Watchlist') &&
        <a title="Add to Favorites"
          className="add-to-favorites"
          onClick={addMovie.bind(UserActions, {...movie, movieType: 'FAVORITE'})}>
          <span className="glyphicon glyphicon-heart add-to-list"/>
        </a>
      }

      {
        userMovies.watchlist[movie.id] &&
        <a title="Remove From List"
          className="remove-from-watchlist"
          onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.watchlist[movie.id]._id})}>
          <span className="glyphicon glyphicon-bookmark"/>
        </a>
      }
      { (!userMovies.watchlist[movie.id] && userView !== 'Favorites') &&
        <a title="Add to List"
          className="add-to-watchlist"
          onClick={addMovie.bind(UserActions, {...movie, movieType: 'WATCHLIST'})}>
          <span className="glyphicon glyphicon-bookmark add-to-list"/>
        </a>
      }
     </div>
    </Container>
  )
};