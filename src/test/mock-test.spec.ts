var expect = require('chai').expect;
import server from '../server';
var request = require('supertest');
import { Request, Response, NextFunction } from 'express';
import { FavMovie, IMovie } from '../models';

const userCredentials = {
  email: "raja.khurram20@gmail.com",
  password: "hello"
};

let dbConnection = false;
//now let's login the user before we run any tests
let authenticatedUser = request.agent(server);

describe(`Favorite Movies`, ()=> {
  describe(`Authentication error`, ()=> {
    beforeEach(async function(done: NextFunction){
      authenticatedUser
      .post('/api/user/login')
      .send({})
      .end(()=> {
        done();
      });
    });

    it(`when user is not logged In`, (done: NextFunction)=> {
      authenticatedUser.get('/api/favorites')
      .end(function(err: Error, res: Response){
        expect(res.statusCode).to.equal(401);
        expect(res.body.error).to.equal('You must log in to perform this action!');
        done();
      });
    });
  });

  describe('when user is logged in, ', () => {
    beforeEach((done: NextFunction)=> {
      authenticatedUser
      .post('/api/user/login')
      .send(userCredentials)
      .end(()=> {
        done();
      });
    });
  
    afterEach(function(done: NextFunction){
      if(dbConnection) {
        FavMovie.collection.drop();
      }
      done();
    });
  
    it('call get Favorites with no collection', (done: NextFunction)=> {
      authenticatedUser.get('/api/favorites')
      .end(function(err:Error, res: Response){ console.log('resssssssssssssss', res.body);
        expect(res.body.total).to.equal(0);
        FavMovie.collection.drop();
        done();
      });
    });
  
    it('should return a some fav movies now', (done: NextFunction)=> {
      authenticatedUser.post('/api/favorite')
      .send({id: 12, title: ':title'})
      .end(function(err: Error, res: Response) {
        dbConnection = true;
        done();
      });

      authenticatedUser.get('/api/favorites')
      .end(function(err:Error, res: Response) {
        expect(res.body.total).to.equal(1);
        FavMovie.collection.drop();
        console.log('resssssssssssssss', res);
        done();
      });
    });
  });
});