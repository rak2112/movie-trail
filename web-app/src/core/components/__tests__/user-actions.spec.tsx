import { shallow } from 'enzyme';
import React from "react";
import { create } from 'react-test-renderer';
import { UserMovieType } from 'src/core/interfaces';

import { UserAction, UserActions } from '../user-actions';


describe(`Carousel Component`, () => {

  const defaultProps = {
    addMovie: jest.fn(),
    deleteMovie: jest.fn(),
    movie: {
      id: 2,
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [{id: '2', name: 'English'}],
      status: 'status',
      title: 'title',
      vote_average: '8'
    },
    userMovies: {
      favorites: {},
      watchlist: {}
    }
  } as UserAction;

  const propsWithList = {
    ...defaultProps,
    userMovies: {
      favorites: {
        ...defaultProps.userMovies.favorites,
        2: {
          ...defaultProps.movie, 
          _id: ':Id', 
          movieType: 'FAVORITE' as UserMovieType
        }
      },
      watchlist: {
        2: {
          ...defaultProps.movie,
          _id: ':Id',
          movieType: 'WATCHLIST' as UserMovieType
        }
      }
    }
  };

  it(`should render when movie is already in user favorite list`, () => {
    const props = {
      ...defaultProps,
      userMovies: {
        favorites: {
          ...defaultProps.userMovies.favorites,
          2: {
            ...defaultProps.movie, 
            _id: 'someId', 
            movieType: 'FAVORITE' as UserMovieType
          }
        },
        watchlist: {}
      }
    };

    const wrapper = create(
      <UserActions {...props}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render when movie is not in user list`, () => {
    const wrapper = create(
      <UserActions {...defaultProps}/>
    ).toJSON();
    
    expect(wrapper).toMatchSnapshot();
  });

  it(`should render and should call addMovie with favorite`, () => {
    const wrapper = shallow(
      <UserActions {...defaultProps}/>
    );

    const addToFav = wrapper.find('.add-to-favorites');
    
    expect(wrapper.find('.glyphicon-star').length).toBe(1);
    expect(addToFav.prop('title')).toContain('Add to Favorites');
    expect(wrapper.find('.add-to-watchlist').prop('title')).toBe('Add to List');

    addToFav.simulate('click');
    expect(defaultProps.addMovie).toBeCalledWith({
      id: 2,
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      movieType: 'FAVORITE',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [{id: '2', name: 'English'}],
      status: 'status',
      title: 'title',
      vote_average: '8'
    });
  });

  it(`should render and should call addMovie with watchlist`, () => {
    const wrapper = shallow(
      <UserActions {...defaultProps}/>
    );

    const addToList = wrapper.find('.add-to-watchlist');
    
    expect(wrapper.find('.glyphicon-star').length).toBe(1);
    expect(addToList.prop('title')).toBe('Add to List');

    addToList.simulate('click');
    expect(defaultProps.addMovie).toBeCalledWith({
      id: 2,
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      movieType: 'WATCHLIST',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [{id: '2', name: 'English'}],
      status: 'status',
      title: 'title',
      vote_average: '8'
    });
  });

  it(`should render when movie is already in user favorite and watchlist`, () => {
    
    const wrapper = shallow(
      <UserActions {...propsWithList}/>
    );

    const removeFromFavs = wrapper.find('.remove-from-favorites');
    const removeFromList = wrapper.find('.remove-from-watchlist');
    

    expect(wrapper.find('.add-to-favorites').length).toBe(0);
    expect(removeFromFavs.prop('title')).toContain('Remove From Favorites');

    removeFromFavs.simulate('click');
    expect(defaultProps.deleteMovie).toHaveBeenCalled();
  
    expect(wrapper.find('.add-to-watchlist').length).toBe(0);
    expect(removeFromList.prop('title')).toContain('Remove From List');
    
    removeFromList.simulate('click');
    expect(defaultProps.deleteMovie).toHaveBeenCalledWith({
      id: ':Id',
      backdrop_path: 'path',
      genre_ids: [1, 2],
      genres: [],
      homepage: 'homepage',
      overview: 'overview',
      runtime: '107',
      release_date: '2-04-19',
      spoken_languages: [{id: '2', name: 'English'}],
      status: 'status',
      title: 'title',
      vote_average: '8'
    });

  });

});