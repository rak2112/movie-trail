import { createSelector } from 'reselect';
import { State } from '../reducers';

import { getApi, getUserMoviesMap } from './movies';


export const getMovieDetails = ({ movieDetails }: State) => 
  (movieDetails && movieDetails.details) ? movieDetails.details: null;

export const getDetails = ({ movieDetails }: State) => 
  movieDetails && movieDetails.details;

export const getMoviePersons = ({ movieDetails }: State ) =>
  (movieDetails && movieDetails.persons) ? movieDetails.persons : null;

export const getMovieImages = ({ movieDetails }: State) =>
 ((movieDetails && movieDetails.images) ? movieDetails.images: null);

export const getMovieVideos = ({ movieDetails }: State) =>
  ((movieDetails && movieDetails.videos) ? movieDetails.videos.results: null);


export const getMovieDetailProps = createSelector(
  getApi,
  getMovieDetails,
  getMoviePersons,
  getMovieImages,
  getMovieVideos,
  getUserMoviesMap,
  (api, details, persons, images, videos, userMovies) => ({
    api,
    details,
    persons,
    images,
    videos,
    userMovies
  })
);