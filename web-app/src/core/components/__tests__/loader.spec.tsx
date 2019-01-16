
import React from 'react';
import { create } from 'react-test-renderer';
import { Loader } from '../loader';

describe(`Loader Component`, () => {

  it(`should render`, () => {
    const wrapper = create(
      <Loader />
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });
});