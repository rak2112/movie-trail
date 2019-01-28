import { loadState, saveState } from '../localStorage';

describe(`LocalStorage`, () => {
  const mockStorage = {
    user: JSON.stringify({name: ':name'})
  };
  beforeEach(()=> {
    global[`sessionStorage`] = {
      getItem: (key: string) => mockStorage[key],
      removeItem: (key: string)=> delete mockStorage[key],
      setItem: jest.fn()
    };
  });

  it(`should call loadState and load with the given key`, () => {
    expect(loadState('user')).toEqual({name: ':name'});
  });

  it(`should call setItem on session storage when saveState gets called`, () => {
    saveState('state', ':val');
    expect(global[`sessionStorage`].setItem).toHaveBeenCalledWith('state', "\":val\"");
  });

});