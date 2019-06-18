import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { from, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import * as actions from '../actions';
import * as service from '../utils';

import { SearchBar } from '../components/searchBar';

export const SearchMovies = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {

  // }, [dispatch, searchTerm]);

  const onSearch = useCallback( (input: string) => {
    setSearchTerm(input);

    of(searchTerm).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(() => { // TODO: fix this..
        return service.searchMovies(searchTerm).subscribe((res) => {
          return dispatch(actions.loadMoviesSuccess({
            ...res,
            results: res.results.filter((searchedMovie: any) => searchedMovie.media_type === 'movie')
          }))
        });
      })
    );
  }, [searchTerm]);

  return <SearchBar onSearch={onSearch}/>;
}