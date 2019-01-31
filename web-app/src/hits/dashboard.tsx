import React from 'react';
import Movies, { MoviesProps } from '../all-movies/dashboard.container';

const Hits = (props: MoviesProps) =>  (<Movies {...props}/>);

export default Hits;
