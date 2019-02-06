"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const awaitHandler_1 = require("./../util/awaitHandler");
const UserController_1 = __importDefault(require("../controllers/UserController"));
exports.userRouter = express_1.Router();
const user = new UserController_1.default();
exports.userRouter.post('/signup', awaitHandler_1.awaitHandlerFactory(user.signUp));
exports.userRouter.post('/login', awaitHandler_1.awaitHandlerFactory(user.login));
exports.userRouter.post('/logout', awaitHandler_1.awaitHandlerFactory(user.logout));
exports.userRouter.post('/account/reset/token', awaitHandler_1.awaitHandlerFactory(user.requestResetToken));
exports.userRouter.post('/account/reset/:token', awaitHandler_1.awaitHandlerFactory(user.resetPassword));
