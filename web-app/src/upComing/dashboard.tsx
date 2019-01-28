import React from 'react';
import Movies from '../all-movies/dashboard.container';

const UpComing = (props: any) =>  (<Movies {...props} route={'up-coming'}/>);

export default UpComing;
