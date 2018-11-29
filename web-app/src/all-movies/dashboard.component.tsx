import React, { PureComponent } from 'react';
import { LoadingCompWrapper } from '../core/components';
import { MovieComponent } from '../core/components/movie';
import { MovieList } from '../core/components/movie-list';
import { MoviesPagination } from '../core/components/pagination';
import { StateProps } from '../core/interfaces';

const LoadMoviesList = LoadingCompWrapper(MovieList);

export class MoviesComponent extends PureComponent <StateProps, any> {
  static displayName = 'MovieComponent';
  componentDidMount() {
    this.props.loadMovies(1);
    this.props.loadGenres();
  }

  render() { 
    // console.log('comp render--->', this.props);
    const { genres, movies: {results, totalPages, pageNo}, loadMovies } = this.props;
    return (
      <>
        <LoadMoviesList {...this.props}>
          {() => (
            <>
              { results.map(movie => <MovieComponent key={movie.id} movie={movie} genres={genres}/>) }
              <MoviesPagination totalPages={totalPages} pageNo={pageNo} loadMovies={loadMovies}/>
            </>
          )}
        </LoadMoviesList>
      </>
    )
  }
}