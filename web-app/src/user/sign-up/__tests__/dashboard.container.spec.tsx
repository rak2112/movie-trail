import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {  Store } from 'redux'
import configureMockStore from 'redux-mock-store';

import { State } from '../../../core/reducers/index';
import { defaultState } from '../../../test-mock';
import ConnectedContainer from '../dashboard.container';


describe(`SignUp Container`, () => {
  let initialState: State;
  let store: Store;
  const dispatch = jest.fn((fn) => fn);
  const urlParams = {match: { params: {token: ':token'}, url: ':url'}};
  const values = { password: ':pass', confirmPassword: ':confirmPass'};

  beforeEach(() => {
    initialState = defaultState;
  });

  it(`should dispatch an action if password is not matched`, () => {

    store = configureMockStore()(initialState);
    const component = shallow(
      <Provider store={store}>
        <ConnectedContainer/>
      </Provider>
    );
    
    const tree: any = component.dive();
    expect(tree.props().onSubmit(values, dispatch, urlParams))
      .toEqual({
        error: 'Your password does not match, Please type again!',
        type: '[movieBase] Api error'
      });
  });

  it(`should dispatch an action for signing up if route is for registration`, () => {
    const params = {...urlParams, match: { ...urlParams.match, url: '/register'}};
    store = configureMockStore()(initialState);
    const component = shallow(
      <Provider store={store}>
        <ConnectedContainer/>
      </Provider>
    );
    
    const tree: any = component.dive();
    expect(tree.props().onSubmit({ password: ':password', confirmPassword: ':password'}, dispatch, params))
      .toEqual({
        formValues:{
          confirmPassword: ':password',
          password: ':password'
        },
        type: '[movieBase] user signup request'
      });
  });

  it(`should dispatch an action for reset password`, () => {
    const params = {...urlParams, match: { ...urlParams.match, url: '/reset'}};
    store = configureMockStore()(initialState);
    const component = shallow(
      <Provider store={store}>
        <ConnectedContainer/>
      </Provider>
    );
    
    const tree: any = component.dive();
    expect(tree.props().onSubmit({ password: ':password', confirmPassword: ':password'}, dispatch, params))
      .toEqual({
        formValues:{
          confirmPassword: ':password',
          password: ':password',
          token: ':token'
        },
        type: '[movieBase] reset user passsword'
      });
  });

});