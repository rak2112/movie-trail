import { mount, shallow } from 'enzyme';
import React from "react";
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom'
import { create } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import { defaultState } from '../../test-mock';

import { Genre, Movies, UserMovieMap } from '../../core/interfaces';
import { MoviesComponent } from '../dashboard.component';

let context: any;
let store: any;
let initialState: any;
describe(`Movies Component`, () => {
  const getUuid = jest.fn();
  const props = {
    addMovie: jest.fn(),
    search: jest.fn(),
    deleteMovie: jest.fn(),
    genres:[
      {id:2, name: "Action"} as Genre
    ], 
    loadMovies: jest.fn(),
    movies: {
      totalPages: 1, pageNo: 1, totalResults: 3, 
      results: [{
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
      },
      {
        id: 3,
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
      }]
    } as Movies,
    userMovies: {
      favorites: {
        2: {
          id: 2,
          _id: '23',
          backdrop_path: 'path',
          genre_ids: [1, 2],
          genres: [],
          homepage: 'homepage',
          movieType: 'FAVORITE',
          overview: 'overview',
          runtime: '107',
          release_date: '2-04-19',
          spoken_languages: [],
          status: 'status',
          title: 'title',
          vote_average: 'vote_avg'
        }
      },
      watchlist: {}
    } as UserMovieMap
  };

  beforeEach(() => {
    context = {};
    initialState = {
      ...defaultState,
      user: {
        movies: [{movieType: 'FAVORITE', id:2}, {movieType: 'FAVORITE', id:1}]

      },
      movies: {
        totalPages: 1, pageNo: 1, totalResults: 3, 
        results: [{
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
        },
        {
          id: 3,
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
        }]
      } as Movies,
    };
    store = configureMockStore()(initialState);
    // getUuid.mockReturnValue('uuid');
    // jest.mock('../../core/components/movie', () => 'MovieComponent');
  });

  it(`should match snapshot`, () => {
    const component = create(
      <Provider store={store}>
        <StaticRouter location="someLocation" context={context}>
        {/* used to wrap Router around the Link */}
        <MoviesComponent {...props}/>
      </StaticRouter>
      </Provider>
      
      
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
  
  it(`should have children`, () => {

    const wrapper = shallow (
      <MoviesComponent {...props}/>
    );

    expect(wrapper.find('SearchBar').length).toEqual(1);
    expect(wrapper.find('MovieList').length).toEqual(1);
  });

});