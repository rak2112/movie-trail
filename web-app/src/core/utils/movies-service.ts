import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { http } from '../../index';
import { Genre, Movies } from '../interfaces';
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

export const getGenres = (): Observable<Genre[]> => {
  return  http.getJSON(`${paths.apiUrl}/genre/movie/list${paths.apiKey}`).pipe(
    map(res => res.genres)
  )
};