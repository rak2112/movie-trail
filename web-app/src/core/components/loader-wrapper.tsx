import React, { ComponentType, PureComponent } from 'react';
import { Api, Genre, Movies } from '../interfaces';
import { Loader } from './loader';

interface Props {
  api: Api;
  movies: Movies;
  genres: Genre[]
}

export const LoadingCompWrapper = (WrappedComponent: ComponentType<any>) : ComponentType <any> =>{
  return class extends PureComponent <Props> {
    public render() { 
      // console.log('wrrappperrr compponetn --->', this.props);
      const { api: {isFetching}, ...movieProps } = this.props;
      if(isFetching) {
        return <Loader/>
      }
      return <WrappedComponent {...movieProps}/>
    }
  }
};