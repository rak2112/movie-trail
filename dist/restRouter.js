"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiErrorHandler_1 = require("./services/apiErrorHandler");
const requireLogin_1 = __importDefault(require("./middlewares/requireLogin"));
const movies_1 = require("./movies");
const user_1 = require("./user");
exports.restRouter = express_1.default.Router();
exports.restRouter.use('/user', user_1.userRouter);
exports.restRouter.use('/movies', requireLogin_1.default, movies_1.moviesRouter);
exports.restRouter.use(apiErrorHandler_1.apiErrorHandler);
