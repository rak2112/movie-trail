import React, { PureComponent } from 'react';
import { Posters } from './posters';

import { LoadingCompWrapper } from '../../core/components/loader-wrapper';
import { Movies } from '../../core/interfaces';


interface Props {
  movies: Movies,
  loadMovies: (pageNo: number) => void;
};

const LoadPosters = LoadingCompWrapper(Posters);

LoadPosters.displayName = 'Posters';

export const HomeComponent = (props: Props) => <LoadPosters {...props} />