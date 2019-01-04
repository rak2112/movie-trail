import React from 'react';
import styled from 'react-emotion';

import { Movie, UserMovieMap, UserView } from '../interfaces';

const Container = styled('div')`
  background: #000;
  font-size: 22px;
  opacity: 0.9;
  text-align: right !important;
  .user-actions {
    text-align: end;
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
`;

export interface UserAction {
  movie: Movie;
  userMovies: UserMovieMap
  userView?: UserView;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
}

export const UserActions = ({addMovie, deleteMovie, movie, userView, userMovies}: UserAction) => {
  return (
    <Container>
     <div className="user-actions">
      <span className='rating'>{movie.vote_average}<span className="glyphicon glyphicon-star"/></span>
        { userMovies.favorites[movie.id] &&
          <a title="Remove From Favorites"
            onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.favorites[movie.id]._id})}>
            <span className="glyphicon glyphicon-heart"/>
          </a>
        }  
        { (!userMovies.favorites[movie.id] && userView !== 'Watchlist') &&
          <a title="Add to Favorites"
            onClick={addMovie.bind(UserActions, {...movie, movieType: 'FAVORITE'})}>
            <span className="glyphicon glyphicon-heart add-to-list"/>
          </a>
        }

        {
          userMovies.watchlist[movie.id] &&
          <a title="Remove From List" onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.watchlist[movie.id]._id})}>
            <span className="glyphicon glyphicon-bookmark"/>
          </a>
        }
        { (!userMovies.watchlist[movie.id] && userView !== 'Favorites') &&
          <a title="Add to List" onClick={addMovie.bind(UserActions, {...movie, movieType: 'WATCHLIST'})}>
            <span className="glyphicon glyphicon-bookmark add-to-list"/>
          </a>
        }
     </div>
    </Container>
  )
};