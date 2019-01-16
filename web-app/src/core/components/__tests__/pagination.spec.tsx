
import { mount, shallow } from 'enzyme';
import React from 'react';
import { create } from 'react-test-renderer';
// import sinon from 'sinon';
import { MoviesPagination, Pagination } from '../pagination';

describe(`Pagination Component`, () => {
  const defaultProps = {
    pageNo: 1,
    totalPages: 100,
    loadMovies: (pageNo) => jest.fn(),
    // onChange: () => jest.fn()
  } as Pagination;

  it(`should render with given inputs`, () => {
    const wrapper = create(
      <MoviesPagination {...defaultProps}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

  // :TODO simulation of event is not working for react-js-pagination.
  // fit(`should render with desired props`, () => {
  //   const wrapper = mount(<MoviesPagination {...defaultProps}/>);

  //   const spy = jest.spyOn(defaultProps, 'loadMovies');
  //   // jest.spyOn(defaultProps, 'onChange');
    
  //   console.log('wrappp pagination', wrapper.find('li').at(5).debug());
  //   const li = wrapper.find('a').at(3);

  //   wrapper.find('a').at(5).simulate('click', 4);
  //   wrapper.find('li').at(5).simulate('change', 4);
  //   expect(spy).toHaveBeenCalledWith(5);
  // });
});