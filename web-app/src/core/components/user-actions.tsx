import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  background: #000;
  font-size: 22px;
  opacity: 0.9;
  text-align: right !important;
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

export const UserActions = ({addMovie, deleteMovie, movie, userMovies}: any) => {
  return (
    <Container>
      <span className='rating'>{movie.vote_average}<span className="glyphicon glyphicon-star"/></span>
      { (userMovies.favorites[movie.id] && userMovies.favorites[movie.id].movieType === 'FAVORITE') ?
        <a title="Remove From Favorites"
          onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.favorites[movie.id]._id})}>
          <span className="glyphicon glyphicon-heart"/>
        </a>
        :
        <a title="Add to Favorites"
          onClick={addMovie.bind(UserActions, {...movie, movieType: 'FAVORITE'})}>
          <span className="glyphicon glyphicon-heart add-to-list"/>
        </a>
      }

      {
        (userMovies.watchlist[movie.id] && userMovies.watchlist[movie.id].movieType === 'WATCHLIST') ? 
        <a title="Remove From List" onClick={deleteMovie.bind(UserActions, {...movie, id: userMovies.watchlist[movie.id]._id})}>
          <span className="glyphicon glyphicon-bookmark"/>
        </a>
        :
        <a title="Add to List" onClick={addMovie.bind(UserActions, {...movie, movieType: 'WATCHLIST'})}>
          <span className="glyphicon glyphicon-bookmark add-to-list"/>
        </a>
      }
    </Container>
  )
};