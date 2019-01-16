import React, { ComponentType, PureComponent } from 'react';

import { Loader } from '../core/components/loader';
import { Api, Genre, Movie, UserMovieMap } from '../core/interfaces';


interface Props {
  api? : Api;
  genres: Genre[];
  userMovies: UserMovieMap;
  addMovie: (movie: Movie) => void;
  deleteMovie: (movie: Movie) => void;
  loadGenres?: () => void;
  loadUserMovies: () => void;
  loadMovieDetail: (id: number) => void;
}

export const LoadingComponent = (WrappedComponent: ComponentType<any>) : ComponentType <any> =>{
  return class extends PureComponent <any> {
    componentDidMount() { 
      const { match: { params: { id }}} = this.props;
      this.props.loadMovieDetail(id);
      this.props.loadUserMovies();
    }

    public render() { 
      const { api: {isFetching}, ...movieProps } = this.props;
      
      if(isFetching) {
        return <Loader/>
      }

      if(this.props.details) {
        return <WrappedComponent {...movieProps}/>
      }

      return null;
      
    }
  }
};