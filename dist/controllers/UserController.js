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
const user_1 = require("../user");
const sgMail_1 = require("../services/sgMail");
class UserController {
    constructor() { }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: { email, displayName }, body: data } = req;
            const userExists = yield user_1.User.findOne({ email });
            if (userExists) {
                res.send({ status: 409, res: `Account with that email address already exists.` });
            }
            else {
                try {
                    yield new user_1.User(data).save();
                    res.send(displayName);
                }
                catch (err) {
                    res.end();
                }
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => {
                if (err) {
                    return res.statusCode = 401;
                }
                if (!user) {
                    return res.statusCode = 401;
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    const { displayName } = user;
                    res.send({ displayName });
                });
            })(req, res, next);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.logout();
            res.sendStatus(200);
        });
    }
    ;
    requestResetToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: { email }, headers: { host } } = req;
            const user = yield user_1.User.findOne({ email }).exec();
            const token = JSON.stringify(yield sgMail_1.createToken());
            if (!user) {
                return res.send({ message: 'Account with that email address does not exist.' });
            }
            user.passwordResetToken = token;
            user.passwordResetExpires = new Date(Date.now() + 3600000); // an hr for now...
            yield user.save();
            yield sgMail_1.sendPasswordRequestEmail(email, token, host);
            res.send({ message: `An e-mail has been sent to ${email} with further instructions.` });
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: { password }, params: { token } } = req;
            const user = yield user_1.User
                .findOne({ passwordResetToken: JSON.stringify(token) })
                .where('passwordResetExpires').gt(Date.now())
                .exec();
            if (!user) {
                return res.send({ message: 'Password reset token is invalid or has expired.' });
            }
            user.password = password;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save();
            yield sgMail_1.sendConfirmationEmail(user);
            res.sendStatus(200);
        });
    }
}
exports.default = UserController;
