import { combineEpics } from 'redux-observable';
import { loadMovieDetails } from './movie-details';
import { addMovie, deleteMovie, loadGenres, loadHitMovies,
  loadLatestMovies, loadMovies, loadUpcomingMovies, loadUserMovies } from './movies';
import { searchMovies } from './searchMovies';
import { resetPassword, sendPasswordRequest, userLogin, userLogOut, userSignUp } from './user';

// import { fetchMoviesEpic, fetchExploreEpic, fetchNextPageEpic, fetchMovieDetailsEpic, searchForMoviesEpic } from './movieList_Epic.js';

export const rootEpic = combineEpics(
  addMovie,
  deleteMovie,
  loadGenres,
  loadHitMovies,
  loadLatestMovies,
  loadMovieDetails,
  loadMovies,
  loadUpcomingMovies,
  loadUserMovies,
  resetPassword,
  searchMovies,
  sendPasswordRequest,
  userLogin,
  userLogOut,
  userSignUp
  // fetchExploreEpic,
  // fetchNextPageEpic,
  // fetchMovieDetailsEpic,
  // searchForMoviesEpic
);
