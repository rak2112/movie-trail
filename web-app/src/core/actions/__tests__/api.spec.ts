import * as Actions from '..';

describe(`API Actions`, () => {
  it(`should call ApiRequest action`, ()=> {
    expect(Actions.apiRequest()).toEqual({type: '[movieBase] Pending api request'})
  });

  it(`should call ApiRequest action`, ()=> {
    expect(new Actions.ApiRequest()).toEqual({type: '[movieBase] Pending api request'})
  });


  it(`should call ApiResponse action`, ()=> {
    expect(new Actions.ApiResponse()).toEqual({type: '[movieBase] Completed api request'})
  });

  it(`should call apiResponse action`, ()=> {
    expect(Actions.apiResponse()).toEqual({type: '[movieBase] Completed api request'})
  });

  it(`should call ApiError action`, ()=> {
    expect(new Actions.ApiError('network error detected'))
      .toEqual({
        error: 'network error detected',
        type: '[movieBase] Api error'
      })
  });

  it(`should call ApiError action`, ()=> {
    expect(Actions.apiError('network error detected'))
      .toEqual({
        error: 'network error detected',
        type: '[movieBase] Api error'
      })
  });
});