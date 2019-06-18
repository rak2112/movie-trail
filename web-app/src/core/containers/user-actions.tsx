import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'react-emotion';
import { connect, MapStateToProps } from 'react-redux';

import { find } from 'lodash';
import { addMovie, deleteMovie } from '../../core/actions';
import { AddRemoveFavorite } from '../../core/components/addRemoveFavs';
import { AddRemoveWatchList } from '../../core/components/addRemoveWatchList';
import { State } from '../../core/reducers/index';
import { getUserActionProps } from '../../core/selectors/index';
import { GenresMap, Movie, User, UserMovie, UserMovieMap,  } from '../interfaces';

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
  userView?: string; 
  profileView?: boolean;
}

export interface StateProps {
  favorites: UserMovie[];
  user?: User;
  watchList: UserMovie[];
}

interface DispatchProps {
  addMovie: (movie: UserMovie) => void;
  deleteMovie: (movie: UserMovie) => void;
}
export type Actions = UserAction & StateProps & DispatchProps;

const getYear = (date: string) => new Date(date).getFullYear();

export const UserActions = ({profileView, user, userView, movie, favorites, watchList, ...props }: Actions) => {

  const [favorite, setFavorite] = useState(!!find(favorites, ['id', movie.id]));
  const [inWatch, setWatchList] = useState(!!find(watchList, ['id', movie.id]));

  const addRemoveFavorites = useCallback(() => {
    setFavorite((fav: boolean) => !fav);
    
    if (!favorite) {
      props.addMovie({...movie, movieType: 'FAVORITE'});
    }
    else {
      const {_id: id}: any = favorites.find(({id: movieId}: any) => movieId === movie.id);
      props.deleteMovie({...movie, id });
    }
  }, [favorite, favorites]);

  const addRemoveWatchList = useCallback(() => {
    setWatchList((inList: boolean) => !inList);
    if (!inWatch) {
      props.addMovie({...movie, movieType: 'WATCHLIST'});
    }
    else {
      const {_id: id}: any = watchList.find(({id: movieId}: any) => movieId === movie.id);
      props.deleteMovie({...movie, id });
    }
  }, [inWatch, watchList]);

  return (
    <Container>
      <div className="user-actions">
        <span className='rating'>{movie.vote_average}<span className="glyphicon glyphicon-star"/></span>
        { movie.release_date &&
          <span className='year'><span className="glyphicon glyphicon-calendar"/>{getYear(movie.release_date)}</span>
        }

        { (user && !profileView) ? 
          <>
            <AddRemoveFavorite favorite={favorite} onClick={addRemoveFavorites}/>
            <AddRemoveWatchList inWatch={inWatch} onClick={addRemoveWatchList}/>
          </>
          : null
        }

        {
          (profileView && userView === 'Favorites') ?
          <AddRemoveFavorite favorite={favorite} onClick={addRemoveFavorites}/> : null
        }

        {
          (profileView && userView === 'Watchlist') ?
          <AddRemoveWatchList inWatch={inWatch} onClick={addRemoveWatchList}/> : null
        }
      </div>
    </Container>
  )
};

const mapStateToProps: MapStateToProps<any, any, any> = (state: State) => {
  const props = getUserActionProps(state);
  return { ...props };
};

export default connect<StateProps, DispatchProps>(mapStateToProps, {
  addMovie,
  deleteMovie
}) (UserActions);