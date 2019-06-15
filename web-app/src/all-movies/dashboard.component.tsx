import React from 'react';
import { 
  MovieComponent, 
  MovieList, 
  MoviesPagination, 
  Toaster 
} from '../core/components';
import { Movie } from '../core/interfaces';
import { SearchBar } from '../top-menu/searchBar.component';
import { MoviesProps } from './dashboard.container';

export const MoviesComponent = ({
  genres, 
  loadMovies,
  movies: {results, totalPages, pageNo},
  search
}: MoviesProps) => {
  return (
    <>
    <SearchBar searchMovies={search}/>
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
              pageNo={pageNo}
              loadMovies={loadMovies}
            />
          </>
        )}
      </MovieList>
    </>
  )
};
