
import React from 'react';
import { create } from 'react-test-renderer';
import { FormInput } from '../form-input';

describe(`FormInput Component`, () => {
  const defaultProps = {
    input: null,
    placeholder: 'Enter your name',
    label: 'Label A',
    type: 'text',
    meta: {
      touched: false,
      error: false,
      warning: false
    }
  };

  it(`should render input without errors`, () => {
    const wrapper = create(
      <FormInput {...defaultProps}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });
  
  it(`should render the given input with some error`, () => {
    const props = { ...defaultProps, meta: { ...defaultProps.meta, touched: true, error: 'You have some error'}}
    const wrapper = create(
      <FormInput {...props}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render the given input with some warning`, () => {
    const props = { ...defaultProps, meta: { ...defaultProps.meta, touched: true, warning: 'You have some warning'}}
    const wrapper = create(
      <FormInput {...props}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });
  
});