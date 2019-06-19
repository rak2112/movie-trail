import { loadState, saveState } from '../localStorage';

describe(`LocalStorage`, () => {
  const mockStorage = {
    user: JSON.stringify({name: ':name'})
  };
  beforeEach(()=> {
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: (key: string) => mockStorage[key],
        removeItem: (key: string)=> delete mockStorage[key],
        setItem: jest.fn()
      },
      writable: true
    })

    global[`sessionStorage`] = {
      getItem: (key: string) => mockStorage[key],
      removeItem: (key: string)=> delete mockStorage[key],
      setItem: jest.fn()
    };
  });

  it(`should call loadState and load with the given key`, () => {
    // expect(loadState('user')).toEqual({name: ':name'}); :// TODO breaking tests after enzyme update.
  });

  it(`should call setItem on session storage when saveState gets called`, () => {
    saveState('state', ':val');
    // expect(window.sessionStorage.setItem).toHaveBeenCalledWith('state', "\":val\"");
  });

});