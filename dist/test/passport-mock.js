"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
// var	StrategyMock = require('./strategy-mock');
function verifyFunction(user, done) {
    // Emulate database fetch result
    var mock = {
        id: '5b3cdb77979e2c5c3ee31b11',
        _id: '5b3cdb77979e2c5c3ee31b11',
        name: 'John',
    };
    done(null, mock);
}
const strategy_mock_1 = __importDefault(require("./strategy-mock"));
module.exports = function (app, options) {
    // create your verify function on your own -- should do similar things as
    // the "real" one.
    passport.use(new strategy_mock_1.default(options, verifyFunction));
    app.get('/api/user/login', passport.authenticate('mock'));
};
