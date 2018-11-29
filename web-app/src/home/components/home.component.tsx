import React, { PureComponent } from 'react';
import { Posters } from './posters';

import { LoadingCompWrapper } from '../../core/components';
import { Movies } from '../../core/interfaces';


interface Props {
  movies: Movies,
  loadMovies: (pageNo: number) => void;
};

const LoadPosters = LoadingCompWrapper(Posters);

export class HomeComponent extends PureComponent <Props, {}> {

  componentDidMount(): void {
    this.props.loadMovies(1);
  }
  render() {
    return (
     <LoadPosters {...this.props} />
    )
  }
}