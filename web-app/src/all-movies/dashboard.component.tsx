import React, { PureComponent } from 'react';
import { 
  MovieComponent, 
  MovieList, 
  MoviesPagination, 
  Toaster 
} from '../core/components';
import { Movie } from '../core/interfaces';
import { SearchBar } from '../top-menu/searchBar.component';
import { MoviesProps } from './dashboard.container';

const defaultProps = { movies: {pageNo:0, totalPages: 0, results: [], totalResults: 0 }};

export class MoviesComponent extends PureComponent <MoviesProps> {

  static displayName = 'MoviesComponent';
  static defaultProps =  defaultProps;

  render() {
    const {
      addMovie,
      deleteMovie,
      genres, 
      loadMovies,
      movies: {results, totalPages, pageNo},
      userMovies  
    } = this.props;

    return (
      <>
      <SearchBar searchMovies={this.props.search}/>
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
                    addMovie={addMovie} 
                    deleteMovie={deleteMovie} 
                    userMovies={userMovies} />) 
              }
              <MoviesPagination totalPages={totalPages} pageNo={pageNo} loadMovies={loadMovies}/>
            </>
          )}
        </MovieList>
      </>
    )
  }
};