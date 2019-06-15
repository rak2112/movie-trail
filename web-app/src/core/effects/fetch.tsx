import React, { useEffect, useReducer, useState } from 'react';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as service from '../utils';

import rootReducer from '../reducers/index';


interface Actions {
  type: string;
  data?: MovieDetail;
}

interface MovieAction extends Actions {
  data: MovieDetail;
}

export interface MovieDetail {
  isFetching?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  details: any;
  images: any;
  persons: any;
  videos: any
}


export const useFetch = (dependencies: any, initialData: any) => {
  const [ pageNo ] = dependencies;
  const [id] = useState(pageNo);

  const [state, dispatch] = useReducer(rootReducer, initialData);

  useEffect(()=> {
    let didCancel = false;

    const fetchData = async () => {
      
      dispatch({ type: actions.LOAD_MOVIE_DETAILS });

      service.getMovies(1).subscribe(
        (res) => {
          actions.loadMoviesSuccess({ ...res, pageNo })
      },
      (error) => {
        // dispatch({ type: actions.LOAD_MOVIE_DETAILS_FAILURE, error });
      });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  return {...state};  
};