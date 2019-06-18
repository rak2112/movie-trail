import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../core/actions';
import { SearchMovies } from '../core/containers/search';
import { State } from '../core/reducers/index';
import { getMoviesProps } from '../core/selectors';

import { GenresMap, Movie, Movies } from '../core/interfaces';
import * as service from '../core/utils';

import { 
  ApiQuery,
  MovieComponent, 
  MovieList, 
  MoviesPagination, 
  Toaster 
} from '../core/components';

import { MoviesProps } from './latest';

export const AllMovies = () => {
  const props: MoviesProps = useSelector((state: State): MoviesProps => getMoviesProps(state));

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = service.getMovies(page).subscribe(
      (res: Movies) => {
        dispatch(actions.loadMoviesSuccess({ ...res, pageNo: page }));
    },
    (error) => {
      dispatch(actions.apiError(error));
    });

    return ()=> observer.unsubscribe();
  }, [dispatch, page]);

  const handlePageChange = (pageToCall: number) => {
    setPage(pageToCall);
  };

  return (
    <ApiQuery {...props}>
      {({genres, movies: {results, totalPages}}: { genres: GenresMap, movies: Movies}) => {

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
