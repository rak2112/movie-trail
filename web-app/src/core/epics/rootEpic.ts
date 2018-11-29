import { combineEpics } from 'redux-observable';
import { loadMoviesEpic, loadMoviesPostersEpic } from './movies';
import { resetPassword, userLogin, userLogOut, userSignUp } from './user';
// import { fetchMoviesEpic, fetchExploreEpic, fetchNextPageEpic, fetchMovieDetailsEpic, searchForMoviesEpic } from './movieList_Epic.js';

export const rootEpic = combineEpics(
  loadMoviesEpic,
  loadMoviesPostersEpic,
  resetPassword,
  userLogin,
  userLogOut,
  userSignUp
  // fetchExploreEpic,
  // fetchNextPageEpic,
  // fetchMovieDetailsEpic,
  // searchForMoviesEpic
);
