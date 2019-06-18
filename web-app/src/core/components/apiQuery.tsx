import React from 'react';
import {
  Loader,
  LoadError,
} from '../components';

export const ApiQuery = ({children, ...props}: any) => {

  const { api: {isFetching, hasError }, ...data } = props;

  if(isFetching) {
    return <Loader/>
  }

  if(hasError) {
    return <LoadError hasError={hasError} errorMessage={'Something has gone wrong!'}/>
  };
  
  return (
    <>
      {children({...data})}
    </>
  )
}