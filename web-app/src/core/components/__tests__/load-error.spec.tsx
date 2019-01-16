
import React from 'react';
import { create } from 'react-test-renderer';
import { LoadError } from '../load-error';

describe(`LoadError Component`, () => {
  const defaultProps = {
    hasError: true,
    errorMessage: 'Error, something has gone wrong'
  };

  it(`should render with given inputs`, () => {
    const wrapper = create(
      <LoadError {...defaultProps}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render with given inputs`, () => {
    const props = { ...defaultProps, hasError: false }; 
    const wrapper = create(
      <LoadError {...props}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });
});