import React from "react";
import { StaticRouter } from 'react-router'
import { create } from 'react-test-renderer';

import { GenresMap, Movie, UserMovieMap } from '../../interfaces';
import { MovieComponent } from '../movie';


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

describe(`MovieComponent`, () => {
  

  beforeEach(() => {
    // util.getUuid.mockReturnValue('uId');
  });

  it(`should match the snapshot with given inputs`, () => {
    const context = {};
    const component = create(
      <StaticRouter location="someLocation" context={context}>
        <MovieComponent {...props}/>
      </StaticRouter>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});