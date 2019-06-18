import { ApiActionError, MovieDetailAction, UserAction } from '../../actions';
import * as ApiReducer from '../api';
import * as MovieDetailReducer from '../movie-details';
import * as UserReducer from '../user';

describe(`API Reducer`, () => {
  it(`should set the intital state with unknown action type`, () => {
    const action = { type: '[movieBase] some action' } as ApiActionError;
    expect(ApiReducer.api({isFetching: true}, action)).toEqual({
      isFetching: true
    });
  });

  it(`should set the state with api request`, () => {
    const action = { type: '[movieBase] Pending api request' } as ApiActionError;
    expect(ApiReducer.api(undefined, action)).toEqual({
      isFetching: true,
      hasError: false
    });
  });

  it(`should set the state with api response`, () => {
    const action = { type: '[movieBase] Completed api request' } as ApiActionError;
    expect(ApiReducer.api(undefined, action)).toEqual({
      isFetching: false,
      hasError: false,
      errorMessage: ''
    });
  });

  it(`should set the state with api erorr`, () => {
    const action = { type: '[movieBase] Api error', error: 'Unknown error' } as ApiActionError;
    expect(ApiReducer.api(undefined, action)).toEqual({
      isFetching: true,
      hasError: true,
      errorMessage: 'Unknown error'
    });
  });
});

describe(`MovieDetails Reducer`, () => {

  it(`should set the intital state with unknown action type`, () => {
    const action = { type: '[movieBase] some action' } as MovieDetailAction;
    expect(MovieDetailReducer.movieDetails(undefined, action)).toEqual(null);
  });

  it(`should set the state with moive details`, () => {
    const action = { type: '[movieBase] load movie details success', res: {
      details: {id: 1, title: 'Fanatastic Beasts'},
      images: {},
      persons: {},
      videos: {}
    } } as MovieDetailAction;

    expect(MovieDetailReducer.movieDetails(undefined, action)).toEqual({
      details: {id: 1, title: 'Fanatastic Beasts'},
      images: {},
      persons: {},
      videos: {}
    });
  });

  it(`should re-set the state`, () => {
    const initialState = {
      details: {id: 1, title: 'Fanatastic Beasts'},
      images: {},
      persons: {},
      videos: {}
    } as MovieDetailReducer.MovieDetailState;

    const action = { type: '[movieBase] reset movie details' } as MovieDetailAction;

    expect(MovieDetailReducer.movieDetails(initialState, action)).toEqual(null);
  });
});

describe(`User Reducer`, () => {

  it(`should set the intital state with unknown action type`, () => {
    const action = { type: '[movieBase] user login request success', res: {
      email: 'email',
      displayName: ':userName'
    } } as UserAction;
    expect(UserReducer.user(undefined, action)).toEqual({
      email: 'email',
      displayName: ':userName'
    });
  });

});