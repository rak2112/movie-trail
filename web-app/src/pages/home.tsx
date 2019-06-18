import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../core/actions';
import { State } from '../core/reducers/index';
import { getPosterProps } from '../core/selectors';

import { Api, Movies } from '../core/interfaces';
import * as service from '../core/utils';

import { 
  ApiQuery,
  Posters
} from '../core/components';

export interface MoviesProps {
  api: Api | null;
  movies: Movies| null;
}

export const Home = () => {
  const props: MoviesProps = useSelector((state: State): MoviesProps => getPosterProps(state));
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = service.getMovies(1).subscribe(
      (res: Movies) => {
        dispatch(actions.loadMoviesSuccess({ ...res, pageNo: 1 }));
    },
    (error) => {
      dispatch(actions.apiError(error));
    });

    return ()=> observer.unsubscribe();
  }, [dispatch]);

  return (
    <ApiQuery {...props}>
      {(movieProps: {movies: Movies}) => {

        return (
          <>
            <Posters {...movieProps}/>
          </>
        )
      }}
    </ApiQuery>
  )
};
