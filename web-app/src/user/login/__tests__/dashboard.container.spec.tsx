import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {  Store } from 'redux'
import configureMockStore from 'redux-mock-store';

import { State } from '../../../core/reducers/index';
import { defaultState } from '../../../test-mock';
import ConnectedContainer from '../dashboard.container';

describe(`LogIn Container`, () => {
  let initialState: State;
  let store: Store;
  const dispatch = jest.fn((fn) => fn);
  const values = { email: ':email', password: ':password'};

  beforeEach(() => {
    initialState = defaultState;
  });

  it(`should dispatch an action on form Submission`, () => {

    store = configureMockStore()(initialState);
    const component = shallow(
      <Provider store={store}>
        <ConnectedContainer/>
      </Provider>
    );
    
    const tree: any = component.dive();
    expect(tree.props().onSubmit(values, dispatch))
      .toEqual({
        formValues:{
          email: ':email',
          password: ':password'
        },
        type: '[movieBase] user login request'
      });
  });
});