import { shallow } from 'enzyme';
import React from 'react';

import { defaultMoviesState } from '../../../test-mock';
import { HomeComponent } from '../home.component';


describe(`Home Component`, () => {
  const props = {
    api: {isFetching: false},
    movies: defaultMoviesState.movies,
    loadMovies: jest.fn()
  };

  it(`should dispatch actions and have props`, () => {
    const component = shallow(
      <HomeComponent {...props}/>
    );
    expect(component.find('Posters').length).toBe(1);
  });

});
