import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { combineReducers, createStore, Store } from 'redux'
import { reducer as form, reduxForm  } from 'redux-form'

import { Props, SignUpComponent, SignUpProps } from '../dashboard.component';

let store: Store;
let props: any;

describe(`SignUp Component`, () => {
  beforeEach(() => {
    store = createStore(
      combineReducers({ form }),
      { form: {} }
    );

    props = {
      ...props,
      location: { pathname: 'signUp' },
      submitting: false,
      handleSubmit: jest.fn()
    };
  });

  it(`render the component, if form is a registration`, () => {

    const Decorated = reduxForm({ form: 'testForm' })(SignUpComponent)
    const tree = create(
      <Provider store={store}>
        <MemoryRouter initialIndex={0} initialEntries={['/register']}>
          <Route path={'/register'} component={Decorated} />
        </MemoryRouter>
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  });

  it(`render the component, if form is a signup`, () => {

    const Decorated = reduxForm({ form: 'testForm' })(SignUpComponent)
    const tree = create(
      <Provider store={store}>
        <MemoryRouter initialIndex={0} initialEntries={['/signup']}>
          <Route path={'/signup'} component={Decorated} />
        </MemoryRouter>
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  });

  it(`render the component, should call onSubmit if form is submitted`, () => {

    const tree = shallow(
     <SignUpComponent {...props}/>
    );

    tree.find('form').simulate('submit', {target: {id: ':Id'}});
    expect(tree.find('form').props().onSubmit).toHaveBeenCalledWith({ target: { id: ':Id'}});

  });
});