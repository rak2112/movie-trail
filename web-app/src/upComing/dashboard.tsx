import React from 'react';
import Movies, { MoviesProps } from '../all-movies/dashboard.container';

const UpComing = (props: MoviesProps) =>  (<Movies {...props}/>);

export default UpComing;
