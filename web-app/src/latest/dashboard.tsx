import React from 'react';
import Movies, { MoviesProps } from '../all-movies/dashboard.container';

const Latest = (props: MoviesProps) =>  (<Movies {...props} />);

export default Latest;