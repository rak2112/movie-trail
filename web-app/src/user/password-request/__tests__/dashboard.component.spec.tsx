import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { combineReducers, createStore, Store } from 'redux'
import { reducer as form, reduxForm  } from 'redux-form'

import { Props, ResetPassword } from '../dashboard.component';

let store: Store;
let props: Props;

describe(`ResetPassword Component`, () => {
  beforeEach(() => {
    store = createStore(
      combineReducers({ form }),
      { form: {} }
    );

    props = {
      ...props,
      submitting: false,
      handleSubmit: jest.fn()
    };
  });

  it(`render the component, with form`, () => {

    const Decorated = reduxForm({ form: 'testForm' })(ResetPassword)
    const tree = create(
      <Provider store={store}>
        <MemoryRouter initialIndex={0} initialEntries={['/reset']}>
          <Route path={'/reset'} component={Decorated} />
        </MemoryRouter>
      </Provider>
    )
    expect(tree).toMatchSnapshot();
  });

  it(`render the component, should call onSubmit if form is submitted`, () => {

    const tree = shallow(
     <ResetPassword {...props}/>
    );

    tree.find('form').simulate('submit', {target: {email: ':email'}});
    expect(tree.find('form').props().onSubmit).toHaveBeenCalledWith({ target: { email: ':email' }});

  });
});