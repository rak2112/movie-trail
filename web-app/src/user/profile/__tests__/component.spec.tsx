import { mount } from 'enzyme';
import React from "react";
import { StaticRouter } from 'react-router'

import { Genre, Movies, UserMovie, UserMovieMap, } from '../../../core/interfaces';
import { ProfileComponent } from '../component';

const context = {};
describe(`Profile Component`, () => {
  const getUuid = jest.fn();
  const props = {
    addMovie: jest.fn(),
    deleteMovie: jest.fn(),
    genres:[
      {id:2, name: "Action"} as Genre
    ], 
    loadMovies: jest.fn(),
    favorites: [{
      id: 2,
      _id: ":id",
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
    } as UserMovie ],
    watchlist: [],
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
    user: {
      displayName: 'name',
      email: ':email',
      loggedIn: true
    },
    userMovies: {
      favorites: {
        2: {
          id: 2,
          _id: ':id',
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
  
  it(`should have children`, () => {
    const wrapper = mount(
      <StaticRouter location="someLocation" context={context}>
        <ProfileComponent {...props}/>
      </StaticRouter>
    );
    const component = wrapper.find('ProfileComponent');
    expect(component.children().find('ToastContainer').length).toBe(1);
    expect(component.children().find('ProfileDetails').length).toBe(1);

    const tabs = component.children().find('MovieTabs');
    expect(tabs.length).toBe(1);
    expect(tabs.find('Tab').length).toBe(2);
    expect(wrapper.find('#movie-tabs-pane-watchlist h3').text()).toBe('You have not added any movies yet.')

  });

});