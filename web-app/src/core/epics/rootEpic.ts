import { combineEpics } from 'redux-observable';
import { loadMovieDetails } from './movie-details';
import { addMovie, deleteMovie, loadGenres, loadMovies, loadUserMovies } from './movies';
import { resetPassword, sendPasswordRequest, userLogin, userLogOut, userSignUp } from './user';
// import { fetchMoviesEpic, fetchExploreEpic, fetchNextPageEpic, fetchMovieDetailsEpic, searchForMoviesEpic } from './movieList_Epic.js';

export const rootEpic = combineEpics(
  addMovie,
  deleteMovie,
  loadGenres,
  loadMovieDetails,
  loadMovies,
  loadUserMovies,
  resetPassword,
  sendPasswordRequest,
  userLogin,
  userLogOut,
  userSignUp
  // fetchExploreEpic,
  // fetchNextPageEpic,
  // fetchMovieDetailsEpic,
  // searchForMoviesEpic
);
