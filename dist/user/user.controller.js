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
const passport_1 = __importDefault(require("passport"));
const sgMail_1 = require("../services/sgMail");
const user_1 = require("../user");
exports.loginUser = (options) => __awaiter(this, void 0, void 0, function* () {
    const { req, user } = options;
    return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
            console.log('has user loggged in????????', user, 'errror', err);
            if (err) {
                return reject(err);
            }
            const { displayName } = user;
            resolve({ displayName });
        });
    });
});
exports.authenticateUser = (req, res, next, strategy = 'basic') => __awaiter(this, void 0, void 0, function* () {
    passport_1.default.authenticate(strategy, (err, user, info) => __awaiter(this, void 0, void 0, function* () {
        console.log('userrr', user);
        if (err) {
            return res.sendStatus(401);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        const userLogged = yield exports.loginUser({ req, user });
        res.send(userLogged);
    }))(req, res, next);
});
exports.login = (req, res, next) => exports.authenticateUser(req, res, next);
exports.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { body: { email, displayName }, body: data } = req;
    const userExists = yield user_1.User.findOne({ email });
    if (userExists) {
        res.sendStatus(409);
    }
    else {
        const user = (!displayName) ? Object.assign({}, data, { displayName: email }) : data;
        try {
            yield user_1.User.create(user);
        }
        catch (err) {
            console.log('errr in saving user', err);
        }
        exports.authenticateUser(req, res, next, 'local');
    }
});
exports.logOut = (req, res) => {
    req.logout();
    req.session.destroy(() => res.sendStatus(200));
};
exports.requestResetToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { body: { email }, headers: { host } } = req;
    const user = yield user_1.User.findOne({ email });
    const token = JSON.stringify(yield sgMail_1.createToken());
    if (!user) {
        return res.sendStatus(401);
    }
    user.passwordResetToken = token;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // an hr for now...
    yield user.save();
    yield sgMail_1.sendPasswordRequestEmail(email, token, host);
    res.send({ message: `An e-mail has been sent to ${email} with further instructions.` });
});
exports.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { body: { password }, params: { token } } = req;
    const user = yield user_1.User
        .findOne({ passwordResetToken: JSON.stringify(token) })
        .where('passwordResetExpires').gt(Date.now())
        .exec();
    if (!user) {
        return res.sendStatus(401);
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    yield user.save();
    yield sgMail_1.sendConfirmationEmail(user);
    const userLogged = exports.loginUser({ req, res, next, user });
    res.send(userLogged);
});
