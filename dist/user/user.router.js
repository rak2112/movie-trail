"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _1 = require("./");
exports.userRouter = express_1.Router();
exports.userRouter.post('/signup', _1.signUp);
exports.userRouter.get('/login', _1.login);
exports.userRouter.post('/logout', _1.logOut);
exports.userRouter.post('/account/reset/token', _1.requestResetToken);
exports.userRouter.post('/account/reset/:token', _1.resetPassword);
