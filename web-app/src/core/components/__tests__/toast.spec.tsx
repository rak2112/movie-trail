import React from 'react';
import { create } from 'react-test-renderer';
import { Toaster} from '../toast';

describe(`Toast Component`, () => {
  const defaultProps ={ duration: 200 };
  it(`should render`, () => {
    const wrapper = create(
      <Toaster {...defaultProps}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

});