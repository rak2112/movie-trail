import React from "react";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import { StaticRouter } from 'react-router-dom'
import { create } from 'react-test-renderer';

import { GenresMap, Movie, UserMovieMap } from '../../interfaces';
import { MovieComponent } from '../movie';


import { defaultState } from '../../../test-mock';

// jest.mock('../../utils/util-service');
// const util = require('../../utils/util-service');

const props = {
  addMovie: jest.fn(),
  deleteMovie: jest.fn(),
  genres: {2: {id: 2, name: 'Action'}} as GenresMap,
  loadMovies: jest.fn(),
  movie: {
    id: 2,
    backdrop_path: 'path',
    genre_ids: [1, 2],
    genres: [],
    homepage: 'homepage',
    overview: 'overview',
    runtime: '107',
    release_date: '2-04-19',
    spoken_languages: [],
    status: 'status',
    title: 'title',
    vote_average: 'vote_avg'
  } as Movie,
  userMovies: {
    favorites: {},
    watchlist: {}
  } as UserMovieMap
};

let initialState;
let store: any;
describe(`MovieComponent`, () => {
  

  beforeEach(() => {
    initialState = defaultState;
    store = configureMockStore()(initialState);
  });

  it(`should match the snapshot with given inputs`, () => {
    const context = {};
    const component = create(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
          <MovieComponent {...props}/>
        </StaticRouter>
      </Provider>
      
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});