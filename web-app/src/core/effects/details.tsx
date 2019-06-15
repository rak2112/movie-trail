import React, { useEffect, useReducer, useState } from 'react';
import { forkJoin } from 'rxjs';

import * as actions from '../actions';
import rootReducer, { initialState } from '../reducers/index';
import * as service from '../utils';



export const useGetDetails = (initialId: number) => {
  const [id] = useState(initialId);

  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(()=> {
    let didCancel = false;

    const fetchData = async () => {
      const details$ = [
        service.getMovieDetails(id),
        service.getMovieImages(id),
        service.getMovieVideos(id),
        service.getMovieCast(id)
      ];

      forkJoin(details$).subscribe(
        ([details, images, videos, persons]) => {
          dispatch(actions.loadMovieDetailSuccess({
            details,
            images,
            videos,
            persons
          }));
          dispatch(actions.apiResponse());
      },
      (error) => {
        dispatch(actions.apiError(error));
      });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  return {...state};  
};