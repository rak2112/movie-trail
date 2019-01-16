import { mount, shallow } from 'enzyme';
import React from "react";
import { StaticRouter } from 'react-router'
import { create } from 'react-test-renderer';

import { Genre, Movies, UserMovieMap } from '../../core/interfaces';
import { MoviesComponent } from '../dashboard.component';

let context: any;;
describe(`Movies Component`, () => {
  const getUuid = jest.fn();
  const props = {
    addMovie: jest.fn(),
    deleteMovie: jest.fn(),
    genres:[
      {id:2, name: "Action"} as Genre
    ], 
    loadMovies: jest.fn(),
    movies: {
      totalPages: 1, pageNo: 1, totalResults: 3, 
      results: [{
        id: 2,
        backdrop_path: 'path',
        genre_ids: [1, 2],
        genres: [],
        homepage: 'homepage',
        overview: 'overview',
        runtime: '107',
        release_date: '2-04-19',
        spoken_languages: [],
        status: 'status',
        title: 'title',
        vote_average: 'vote_avg'
      },
      {
        id: 3,
        backdrop_path: 'path',
        genre_ids: [1, 2],
        genres: [],
        homepage: 'homepage',
        overview: 'overview',
        runtime: '107',
        release_date: '2-04-19',
        spoken_languages: [],
        status: 'status',
        title: 'title',
        vote_average: 'vote_avg'
      }]
    } as Movies,
    userMovies: {
      favorites: {
        2: {
          id: 2,
          _id: '23',
          backdrop_path: 'path',
          genre_ids: [1, 2],
          genres: [],
          homepage: 'homepage',
          movieType: 'FAVORITE',
          overview: 'overview',
          runtime: '107',
          release_date: '2-04-19',
          spoken_languages: [],
          status: 'status',
          title: 'title',
          vote_average: 'vote_avg'
        }
      },
      watchlist: {}
    } as UserMovieMap
  };

  beforeEach(() => {
    context = {};
    // getUuid.mockReturnValue('uuid');
    // jest.mock('../../core/components/movie', () => 'MovieComponent');
  });

  fit(`should match snapshot`, () => {
    const component = create(
      <StaticRouter location="someLocation" context={context}>
        {/* used to wrap Router around the Link */}
        <MoviesComponent {...props}/>
      </StaticRouter>
      
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
  
  it(`should have children`, () => {
    const wrapper = mount(
      <StaticRouter location="someLocation" context={context}>
        <MoviesComponent {...props}/>
      </StaticRouter>
    );
    
    expect(wrapper.find('MovieComponent').children().length).toEqual(2);
    expect(wrapper.find('footer').children().length).toEqual(1);
    expect(wrapper.find('.user-actions').children().length).toEqual(6);
  });

});