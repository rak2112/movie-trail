import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import {  Store } from 'redux'
import configureMockStore from 'redux-mock-store';

import { defaultState } from '../../../test-mock';
import ConnectedContainer from '../home.container';


describe(`Home Container`, () => {
  let store: Store;

  it(`should dispatch actions and have props`, () => {

    store = configureMockStore()(defaultState);
    const component = shallow(
      <Provider store={store}>
        <ConnectedContainer store={store}/>
      </Provider>
    ).dive();

    const home = component.dive().find('Home');

    expect(home.prop('api')).toEqual({isFetching: true, hasError: false});
    expect(home.prop('genres')).toEqual([{ id: 2, name: 'Action' }]);

    const loadGenres: ()=>void = home.prop('loadGenres');
    expect(loadGenres()).toEqual({ type: '[movieBase] load genres'});

    const loadMovies: (pageNo: number)=>void = home.prop('loadMovies');
    expect(loadMovies(2)).toEqual({ pageNo: 2, type: '[movieBase] load all movies'});
  });

});