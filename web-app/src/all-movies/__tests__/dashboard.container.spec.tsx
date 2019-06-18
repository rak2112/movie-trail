import React, { ComponentClass } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';

import { State } from 'src/core/reducers';
import { defaultMovies, defaultState } from '../../test-mock';
import ConnectedMoviesContainer from '../dashboard.container';


describe(`Movies Container`, () => {
  let initialState: State;
  let store: Store;

  beforeEach(() => {
    initialState = defaultState;
  });

  it(`if the state is in loading`, () => {
    store = configureMockStore()(initialState);

    const component = create(
      <Provider store={store}>
        <MemoryRouter initialIndex={0} initialEntries={['/movies']}>
          <Route path={'/movies'} component={ConnectedMoviesContainer} />
        </MemoryRouter>
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

  it(`if the state is loaded and has data`, () => {
    initialState = {
      ...defaultState, 
      api: {...defaultState.api, isFetching: false},
      movies: defaultMovies
    };

    store = configureMockStore()(initialState);

    const component = create(
      <Provider store={store}>
        <MemoryRouter initialIndex={0} initialEntries={['/movies']}>
          <Route path={'/movies'} component={ConnectedMoviesContainer} />
        </MemoryRouter>
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

});