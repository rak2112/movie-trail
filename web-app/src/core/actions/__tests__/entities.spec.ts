import * as Actions from '../entities';


jest.mock('../../utils/localStorage'); 

// tslint:disable: no-var-requires
const state = require('../../utils/localStorage');

describe(`Entities Actions`, () => {
  it(`should call loadGenres`, () => {
    expect(Actions.loadGenres()).toEqual({type: '[movieBase] load genres'})
  });

  it(`should call loadGenres with dumy if genres exsists`, () => {
    expect(Actions.loadGenres()).toEqual({type: '[movieBase] load genres'})
  });

  it(`should call loadGenres with dumy if genres exsists`, () => {
    state.loadState.mockReturnValue(true);
    expect(Actions.loadGenres()).toEqual({type: 'DUMY'})
  });
});