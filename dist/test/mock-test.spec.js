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
var expect = require('chai').expect;
const server_1 = __importDefault(require("../server"));
var request = require('supertest');
const models_1 = require("../models");
const userCredentials = {
    email: "raja.khurram20@gmail.com",
    password: "hello"
};
let dbConnection = false;
//now let's login the user before we run any tests
let authenticatedUser = request.agent(server_1.default);
describe(`Favorite Movies`, () => {
    describe(`Authentication error`, () => {
        beforeEach(function (done) {
            return __awaiter(this, void 0, void 0, function* () {
                authenticatedUser
                    .post('/api/user/login')
                    .send({})
                    .end(() => {
                    done();
                });
            });
        });
        it(`when user is not logged In`, (done) => {
            authenticatedUser.get('/api/favorites')
                .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                expect(res.body.error).to.equal('You must log in to perform this action!');
                done();
            });
        });
    });
    describe('when user is logged in, ', () => {
        beforeEach((done) => {
            authenticatedUser
                .post('/api/user/login')
                .send(userCredentials)
                .end(() => {
                done();
            });
        });
        afterEach(function (done) {
            if (dbConnection) {
                models_1.FavMovie.collection.drop();
            }
            done();
        });
        it('call get Favorites with no collection', (done) => {
            authenticatedUser.get('/api/favorites')
                .end(function (err, res) {
                console.log('resssssssssssssss', res.body);
                expect(res.body.total).to.equal(0);
                models_1.FavMovie.collection.drop();
                done();
            });
        });
        it('should return a some fav movies now', (done) => {
            authenticatedUser.post('/api/favorite')
                .send({ id: 12, title: ':title' })
                .end(function (err, res) {
                dbConnection = true;
                done();
            });
            authenticatedUser.get('/api/favorites')
                .end(function (err, res) {
                expect(res.body.total).to.equal(1);
                models_1.FavMovie.collection.drop();
                console.log('resssssssssssssss', res);
                done();
            });
        });
    });
});
