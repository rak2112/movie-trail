var passport = require('passport');
// var	StrategyMock = require('./strategy-mock');
function verifyFunction (user, done) { // user = { id: 1};
   // Emulate database fetch result
    var mock = {
       id: '5b3cdb77979e2c5c3ee31b11',
       _id: '5b3cdb77979e2c5c3ee31b11',
       name: 'John',
    };
    done(null, mock);

}    
import StrategyMock from './strategy-mock';

module.exports = function(app, options) {
	// create your verify function on your own -- should do similar things as
	// the "real" one.
	passport.use(new StrategyMock(options, verifyFunction));

	app.get('/api/user/login', passport.authenticate('mock'));
};