import React, { ComponentClass } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';

import { UserMovieType } from '../../../core/interfaces';
import { State } from '../../../core/reducers';
import { defaultState } from '../../../test-mock';
import ConnectedMoviesContainer from '../container';


describe(`Profile Container`, () => {
  let initialState: State;
  let store: Store;
  const context = {};
  beforeEach(() => {
    initialState = {
      ...defaultState,
      user: {
        email: ':userEmail',
        displayName: 'display Name',
        movies: [{
          id: 2,
          backdrop_path: 'path',
          genre_ids: [1, 2],
          genres: [],
          homepage: 'homepage',
          overview: 'overview',
          runtime: '107',
          release_date: '2-04-19',
          spoken_languages: [{id: '2', name: 'English'}],
          status: 'status',
          title: 'title',
          vote_average: '8',
          _id: ':Id', 
          movieType: 'FAVORITE' as UserMovieType
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
          spoken_languages: [{id: '2', name: 'English'}],
          status: 'status',
          title: 'title',
          vote_average: '8',
          _id: ':Id3', 
          movieType: 'WATCHLIST' as UserMovieType
        }]
      }
    }
  });

  it(`should render with data provided`, () => {
    store = configureMockStore()(initialState);
    const component = create(
      
      <Provider store={store}>
        {/* <ConnectedMoviesContainer/> */}
        <StaticRouter location="someLocation" context={context}>
          <ConnectedMoviesContainer/>
        </StaticRouter>
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

});