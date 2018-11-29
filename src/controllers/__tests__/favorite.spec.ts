// import Movies from '../FavoriteController';
// import {dbConnection} from '../../test/connection';
// import server from '../../server';
// import * as cacheService from '../../services/cache';
// import { Request, Response, NextFunction } from 'express';
// import { FavMovie, IMovie } from '../../models';


// describe('should return favorite movies', () => {
//   let movies: any;
//   let getAll: any;
//   const req = {user: {_id: 'testId'}, body: {title: 'movie to add'}};
//   const res = {json: ()=>{}, sendStatus:()=> 201};
//   beforeEach(() => {
//     movies = new Movies();
//     dbConnection();
//   });
//   it('should render correctly', async() => {
//     const results = await movies.post(req, res);
//     expect(results).toBe(2);
//   });
// });
