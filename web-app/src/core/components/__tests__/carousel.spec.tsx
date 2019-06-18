import { shallow } from 'enzyme';
import React, { Component } from "react";
import { create } from 'react-test-renderer';
import { Poster } from '../../interfaces';
import { Carousel, Props } from '../carousel';

describe(`Carousel Component`, () => {

  const props = {
    handleClick: ()=> {return},
    images: {
      backdrops: [
        {
          file_path: '/backdrop/1'
        } as Poster
      ],
      posters: [{
        file_path: '/path/1'
      } as Poster,
      {
        file_path: '/path/2'
      } as Poster,
      {
        file_path: '/path/3'
      } as Poster]
    }
  };

  it(`should match snapshot`, () => {
    const wrapper = create(
      <Carousel {...props}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });
  
  it(`should render with desired props`, () => {
    const wrapper = shallow(
      <Carousel {...props}/>
    );
    const instance = wrapper.instance() as Carousel;
    
    expect(instance.state.active).toBe(1);
    expect(instance.state.images.length).toBe(3);
    expect(wrapper.find('.poster').prop('src')).toContain('/path/2');
    expect(wrapper.find('.thumbnails').children().length).toEqual(3);

    instance.handleClick({ target: { dataset: { index: 2 }}});
    expect(instance.state.active).toBe(2);
    expect(wrapper.find('.poster').prop('src')).toContain('/path/3');
  });

});