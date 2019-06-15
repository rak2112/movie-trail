import { shallow } from 'enzyme';
import React from 'react';
import {  Store } from 'redux'
import configureMockStore from 'redux-mock-store';


import { State } from '../../../core/reducers/index';
import { defaultState } from '../../../test-mock';
import ConnectedContainer from '../dashboard.container';

describe(`PassrordRest Request Container`, () => {
  let initialState: State;
  let store: Store;
  const dispatch = jest.fn((fn) => fn);
  const values = { password: ':password', confirmPassword: ':password'};

  beforeEach(() => {
    initialState = defaultState;
  });

  it(`should dispatch an action on form Submission`, () => {

    store = configureMockStore()(initialState);
    const component = shallow(<ConnectedContainer store={store}/>);
    
    const tree: any = component.dive();
    expect(tree.props().onSubmit(values, dispatch))
      .toEqual({
        formValues:{
          password: ':password',
          confirmPassword: ':password',
        },
        type: '[movieBase] user password reset request'
      });
  });
});