import React, { ComponentClass } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router';
import { create } from 'react-test-renderer';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';

import { State } from '../../reducers';
import ConnectedContainer from '../error';




describe(`Error Container`, () => {
  let store: Store;

  it(`should render`, () => {
    const initialState = { 
      api: {
        hasError: true,
        errorMessage: 'Something has gone wrong!'
      }
    } as State;
    store = configureMockStore()(initialState);

    const component = create(
      <Provider store={store}>
        <ConnectedContainer/>
      </Provider>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });

});