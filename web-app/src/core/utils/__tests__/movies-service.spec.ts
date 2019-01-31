import { TestScheduler } from 'rxjs/testing';

// import { http } from '../../../app';
import * as movieService from '../movies-service';

jest.mock('../../../app');
// tslint:disable: no-var-requires
const service = require('../../../app');

const testScheduler = new TestScheduler((actual, expected) => {
  // somehow assert the two objects are equal
  // e.g. with chai `expect(actual).deep.equal(expected)`
});

describe('MovieService', () => {
  testScheduler.run(({ hot, cold, expectObservable }) => {
    beforeEach(() => {
      service.http.getJson = jest.fn();
    });
  
    it(`should fetch getMovieDetails`, () => {
      const response = {
        title: ':title'
      };
  
      const transformedResponse = response;
  
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });
  
  
      service.http.getJSON.mockReturnValue(response$); 
  
      const query$ = movieService.getMovieDetails(45);
  
      expectObservable(query$).toBe('some'); // not working as expexted..
  
      expect(service.http.getJSON).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/45?api_key=60773f18ef6a7a9ee3d4a640fab964eb`);
  
    });
  
    it(`should fetch getMovieImages`, () => {
      const response = {
        title: ':title'
      };
  
      const transformedResponse = response;
  
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });
  
  
      service.http.getJSON.mockReturnValue(response$); 
  
      const query$ = movieService.getMovieImages(4);
  
      expectObservable(query$).toBe('some'); // not working as expexted..
  
      expect(service.http.getJSON).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/4/images?api_key=60773f18ef6a7a9ee3d4a640fab964eb`);
  
    });
  
    it(`should fetch getMovieVideos`, () => {
      const response = {
        title: ':title'
      };
  
      const transformedResponse = response;
  
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });
  
  
      service.http.getJSON.mockReturnValue(response$); 
  
      const query$ = movieService.getMovieVideos(4);
  
      expectObservable(query$).toBe('some'); // not working as expexted..
  
      expect(service.http.getJSON).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/4/videos?api_key=60773f18ef6a7a9ee3d4a640fab964eb`);
  
    });
  
    it(`should fetch getMovieCast`, () => {
      const response = {
        title: ':title'
      };
  
      const transformedResponse = response;
  
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });
  
  
      service.http.getJSON.mockReturnValue(response$); 
  
      const query$ = movieService.getMovieCast(2);
  
      expectObservable(query$).toBe('some'); // not working as expexted..
  
      expect(service.http.getJSON).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/2/casts?api_key=60773f18ef6a7a9ee3d4a640fab964eb`);
  
    });
  });
});

