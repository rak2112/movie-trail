"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const awaithandler_1 = require("../util/awaithandler");
const UserController_1 = __importDefault(require("../controllers/UserController"));
exports.userRouter = express_1.Router();
const user = new UserController_1.default();
exports.userRouter.post('/signup', awaithandler_1.awaitHandlerFactory(user.signUp));
exports.userRouter.post('/login', awaithandler_1.awaitHandlerFactory(user.login));
exports.userRouter.post('/logout', awaithandler_1.awaitHandlerFactory(user.logout));
exports.userRouter.post('/account/reset/token', awaithandler_1.awaitHandlerFactory(user.requestResetToken));
exports.userRouter.post('/account/reset/:token', awaithandler_1.awaitHandlerFactory(user.resetPassword));
