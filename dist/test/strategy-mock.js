"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport'), util = require('util');
const StrategyMock = function (options, verify) {
    this.name = 'mock';
    this.passAuthentication = options.passAuthentication || true;
    this.userId = options.userId || 1;
    this.verify = verify;
};
util.inherits(StrategyMock, passport.Strategy);
StrategyMock.prototype.authenticate = function authenticate(req) {
    if (this.passAuthentication) {
        var user = {
            id: this.userId
        }, self = this;
        this.verify(user, function (err, resident) {
            if (err) {
                self.fail(err);
            }
            else {
                self.success(resident);
            }
        });
    }
    else {
        this.fail('Unauthorized');
    }
};
exports.default = StrategyMock;
