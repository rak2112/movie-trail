import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../actions';
import { SearchMovies } from '../containers/search';
import { State } from '../reducers';
import { getMoviesProps } from '../selectors';

import { Movie } from '../interfaces';
import * as service from '../utils';

import { 
  ApiQuery,
  MovieComponent, 
  MovieList, 
  MoviesPagination, 
  Toaster 
} from '../components';

export const MoviesComponent = () => {
  const props = useSelector((state: State): any => getMoviesProps(state));

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    service.getMovies(page).subscribe(
      (res) => {
        dispatch(actions.loadMoviesSuccess({ ...res, pageNo: page }));
    },
    (error) => {
      dispatch(actions.apiError(error));
    });
  }, [dispatch, page]);

  const handlePageChange = (pageToCall: number) => {
    setPage(pageToCall);
  };

  return (
    <ApiQuery {...props}>
      {({genres, movies: {results, totalPages}}: any) => {

        return (
          <>
          <SearchMovies/>
            <MovieList>
              {() => (
                <> 
                  <Toaster duration={2000}/>
                  { 
                    results.map((movie: Movie) =>
                      <MovieComponent 
                        key={movie.id} 
                        movie={movie} 
                        genres={genres}
                      />
                    ) 
                  }
                  <MoviesPagination
                    totalPages={totalPages}
                    pageNo={page}
                    loadMovies={handlePageChange}
                  />
                </>
              )}
            </MovieList>
          </>
        )
      }}
    </ApiQuery>
  )
};
