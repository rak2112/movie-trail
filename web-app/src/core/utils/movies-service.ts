import { ajax } from 'rxjs/ajax';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { http } from '../../index';
import { Genre, Movie, MovieDetail, Movies } from '../interfaces';
import { paths } from '../utils/util-service';

export const getMovies = (pageNo: number): Observable<Movies> => {
  return  http.getJSON(`${paths.apiUrl}/discover/movie${paths.apiKey}&page=${pageNo}`).pipe(
    map(res => ({
      pageNo: res.pageNo,
      results: res.results,
      totalResults: res.total_results,
      totalPages: res.total_pages,
    }))
  );
};

export const getMovieDetails = (id: number): Observable<MovieDetail> => {
  return  http.getJSON(`${paths.apiUrl}/movie/${id}${paths.apiKey}`).pipe(
    map(res => (res))
  );
};

export const getMovieImages = (id: number): Observable<MovieDetail> => {
  return  http.getJSON(`${paths.apiUrl}/movie/${id}/images${paths.apiKey}`).pipe(
    map(res => (res))
  );
};

export const getMovieVideos = (id: number): Observable<MovieDetail> => {
  return  http.getJSON(`${paths.apiUrl}/movie/${id}/videos${paths.apiKey}`).pipe(
    map(res => (res))
  );
};

export const getMovieCast = (id: number): Observable<MovieDetail> => {
  return  http.getJSON(`${paths.apiUrl}/movie/${id}/casts${paths.apiKey}`).pipe(
    map(res => (res))
  );
};

export const getGenres = (): Observable<Genre[]> => {
  return  http.getJSON(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).pipe(
    map(res => res.genres)
  )
};

export const addMovieCollection = (movie: Movie): Observable<{id: string}> => {
  return  ajax.post( `/api/movies`, {
    data: JSON.stringify(movie)
  }).pipe(
    map(({ response }) => response )
  )
};

export const deleteMovie = (id: string): Observable<string> => {
  return  ajax.delete( `/api/movies/${id}`).pipe(
    map(({ response }) => response )
  )
};