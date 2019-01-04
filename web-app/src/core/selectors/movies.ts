import { createSelector } from 'reselect';
import { User, UserMovie, UserMovieMap } from '../interfaces';
import { State } from '../reducers';


export const getApi = (state: State) => state.api;
export const getGenres = (state: State) => state.genres;
export const getMovies = (state: State) => state.movies;
export const getUser = (state: State) => state.user;
export const getUserMovies = (state: State) => state.user && state.user.movies || [];

export const getMovieGenres = createSelector(
  getGenres,
  (genres = []) => genres.reduce((genreRes, curr) => ({
    ...genreRes,
    [curr.id]: curr
  }), {})
);

export const getFavoriteMovies = createSelector(
  getUserMovies,
  (userMovies = []) => userMovies.filter(({movieType}) => movieType === 'FAVORITE')
)

export const getWatchListMovies = createSelector(
  getUserMovies,
  (userMovies = []) => userMovies.filter(({movieType}) => movieType === 'WATCHLIST')
)

export const getFavoritesMap = createSelector(
  getFavoriteMovies,
  (favMovies = []) => 
    favMovies.reduce((movies, curr) => ({
      ...movies,
      [curr.id]: curr
    }), {})
);

export const getWatchListMap = createSelector(
  getWatchListMovies,
  (watchList = [] ) =>
    watchList.reduce((movies, curr) => ({
      ...movies,
      [curr.id]: curr
    }), {})
);

export const getUserMoviesMap = createSelector(
  getFavoritesMap,
  getWatchListMap,
  (favorites, watchlist ) => {
    return {
      favorites,
      watchlist
    };
  }
);

export const getPosterProps = createSelector (
  getApi,
  getGenres,
  getMovies,
  (api, genres, movies) => ({
    api,
    genres,
    movies
  })
);

export const getMoviesProps = createSelector (
  getApi,
  getMovies,
  getMovieGenres,
  getUserMoviesMap,
  (api, movies, genres, userMovies) => ({
    api,
    movies,
    genres,
    userMovies
  })
);

export const getProfileProps = createSelector (
  getApi,
  getFavoriteMovies,
  getMovieGenres,
  getUser,
  getUserMoviesMap,
  getWatchListMovies,
  (api, favorites, genres, user, userMovies, watchlist) => ({
    api,
    favorites,
    genres,
    user,
    userMovies,
    watchlist
  })
);