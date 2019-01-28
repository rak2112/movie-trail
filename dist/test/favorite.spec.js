"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../test/connection");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
const models_1 = require("../models");
const secrets_1 = require("../util/secrets");
const FavoriteController_1 = __importDefault(require("../controllers/FavoriteController"));
var httpMocks = require('node-mocks-http');
chai_1.default.use(chai_http_1.default);
const should = chai_1.default.should();
var agent;
var request = require('supertest'), superagent = require('superagent'), path = require('path'), app = server_1.default, auth, passportMock = require(path.join(process.cwd(), 'src', 'test', 'passport-mock.ts'));
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
const keygrip = new Keygrip([secrets_1.SESSION_SECRET]);
const sig = keygrip.sign('session=' + sessionString);
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
    let movies;
    let getAll;
    const req = { user: { _id: 'testId2' }, body: { id: 1232 } };
    const res = { json: () => { }, sendStatus: () => 201 };
    beforeEach((done) => __awaiter(this, void 0, void 0, function* () {
        server_1.default.use(function (req, res, next) {
            req.isAuthenticated = function () {
                return true;
            };
            req.user = { id: 'somnUserId' };
            next();
        });
        //  passportMock(app, {
        //     passAuthentication: true,
        //     userId: 1
        //   });
        movies = new FavoriteController_1.default();
        connection_1.dbConnection();
        const movie = new models_1.FavMovie({
            id: 12,
            users: ['testId2'],
            title: ':title'
        });
        movie.save().then(() => {
            console.log('here nowo in saved');
            done();
        });
    }));
    it(`should call the getFavorites to list all favorites`, (done) => {
        chai_1.default.request(server_1.default)
            .get('/api/favorites')
            // .set("Content-Type", "application/json")
            .set('cookie', [sessionString + '; ' + 'session.sig=' + sig + ';'])
            // agent.attachCookies(req);
            //req.expect(200, done);
            .end(function (err, res) {
            console.log('resss', res.status, 'body', res.body);
            res.should.have.status(200);
            // res.should.be.json;
            // res.body.should.be.a('array');
            // res.body[0].should.have.property('_id');
            // res.body[0].should.have.property('name');
            // res.body[0].name.should.equal('Bat');
            // res.body[0].lastName.should.equal('man');
            done();
        });
    });
    //  it('should render correctly', (done) => {
    //    movies.get(req, res).then((err, response)=>{
    //     console.log('errs', err, 'response', res);
    //     done();
    //    });
    //    expect(2).toBe(2);
    //  }, 20000);
});
