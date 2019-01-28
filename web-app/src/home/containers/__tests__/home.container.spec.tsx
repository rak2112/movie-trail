import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { create } from 'react-test-renderer';
import {  Store } from 'redux'
import configureMockStore from 'redux-mock-store';

import { State } from '../../../core/reducers';
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


    expect(component.prop('api')).toEqual({isFetching: true, hasError: false});
    expect(component.prop('genres')).toEqual([{ id: 2, name: 'Action' }]);

    const loadGenres: ()=>void = component.prop('loadGenres');
    expect(loadGenres()).toEqual({ type: '[movieBase] load genres'});

    const loadMovies: (pageNo: number)=>void = component.prop('loadMovies');
    expect(loadMovies(2)).toEqual({ pageNo: 2, type: '[movieBase] load movies'});
  });

});