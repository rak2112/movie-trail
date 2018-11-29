import {dbConnection} from '../test/connection';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import nock from 'nock';
import sinon from 'sinon';
// import request from 'request';
import requireLogin from '../middlewares/requireLogin';

import * as cacheService from '../services/cache';
import { Request, Response, NextFunction } from 'express';
import { FavMovie, IMovie } from '../models';
import {SESSION_SECRET} from '../util/secrets';
import FavMoviesController from '../controllers/FavoriteController';

var httpMocks = require('node-mocks-http');


chai.use(chaiHttp);
const should = chai.should();
var agent;
var request = require('supertest'),
	superagent = require('superagent'),
	path = require('path'),
	app = server,auth,
	passportMock = require(path.join(process.cwd(), 'src', 'test', 'passport-mock.ts'));

const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../config/keys');
const id = '5aeee94da1eb73f22a560b69';
const sessionObject = {
  passport: {
    user: id
  }
};

const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
const keygrip = new Keygrip([SESSION_SECRET]);
const sig = keygrip.sign('session='+ sessionString);

console.log('sess', sessionString, 'sig', sig);

// describe(`Favorites`, ()=> {
//   // FavMovie.collection.drop();
//   beforeEach((done)=> {
//     // passportMock(app, {
// 		// 	passAuthentication: true,
// 		// 	userId: 1
// 		// });
// 		// request(app)
// 		// 	.post('/api/user/login')
// 		// 	.end(function(err, result) {
// 		// 		if (!err) { console.log('resulttt');
// 		// 			agent.saveCookies(result.res);
// 		// 			done();
// 		// 		} else {
// 		// 			done(err);
// 		// 		}
// 		// 	});
//     // });
//   });  


describe('should post favorite movies', () => {
  // FavMovie.collection.drop();
   let movies: any;
   let getAll: any;
   const req = {user: {_id: 'testId2'}, body: {id: 1232}};
   const res = {json: ()=>{}, sendStatus:()=> 201};
   beforeEach(async (done) => {
    server.use(function(req, res, next) {
      req.isAuthenticated = function() {
        return true;
      };
      req.user = {id: 'somnUserId'};
      next();
    });
    //  passportMock(app, {
    //     passAuthentication: true,
    //     userId: 1
		//   });
      movies = new FavMoviesController();
      dbConnection();

      const movie = new FavMovie({
        id: 12,
        users: ['testId2'],
        title: ':title'
      });
      movie.save().then(()=> {
        console.log('here nowo in saved');
        done();
      });

   });

   it(`should call the getFavorites to list all favorites`, (done)=> {
        chai.request(server)
          .get('/api/favorites')
          // .set("Content-Type", "application/json")
          .set('cookie', [sessionString + '; ' + 'session.sig=' + sig + ';'])
          // agent.attachCookies(req);
           //req.expect(200, done);
          .end(function(err, res){ console.log('resss', res.status, 'body', res.body);
            res.should.have.status(200);
    
            // res.should.be.json;
            // res.body.should.be.a('array');
            // res.body[0].should.have.property('_id');
            // res.body[0].should.have.property('name');
            // res.body[0].name.should.equal('Bat');
            // res.body[0].lastName.should.equal('man');
            done();
          });
      })

  //  it('should render correctly', (done) => {
  //    movies.get(req, res).then((err, response)=>{
  //     console.log('errs', err, 'response', res);
  //     done();
  //    });
  //    expect(2).toBe(2);
  //  }, 20000);
 });
