import React, { ComponentType, PureComponent } from 'react';
import { Api, Genre, Movies } from '../interfaces';
import { Loader } from './loader';

interface Props {
  api: Api;
  movies: Movies;
  genres: Genre[];
  loadGenres: () => void;
  loadUserMovies: () => void;
  loadMovies: (pageNo: number) => void;
}

export const LoadingCompWrapper = (WrappedComponent: ComponentType<any>) : ComponentType <any> =>{
  return class extends PureComponent <any> { 
    
    componentDidMount() {
      const { match: { params: {pageNo} }} = this.props;
      this.props.loadMovies(pageNo || 1);
      this.props.loadGenres();
    }

    public render() { 
      const { api: {isFetching}, movies, ...movieProps } = this.props;
      const props = {...movieProps, movies};
      
      if(isFetching) {
        return <Loader/>
      }
      
      if(movies) {
        return <WrappedComponent {...props}/>
      }

      return null;
      
    }
  }
};