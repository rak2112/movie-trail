"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clearCache_1 = __importDefault(require("../middlewares/clearCache"));
const movie_controller_1 = __importDefault(require("./movie.controller"));
exports.moviesRouter = express_1.Router();
exports.moviesRouter.param('id', movie_controller_1.default.findByParam);
exports.moviesRouter.route('/')
    .get(movie_controller_1.default.getAll)
    .post(clearCache_1.default, movie_controller_1.default.createOne);
//.post(controller.createOne)
exports.moviesRouter.route('/:id')
    .get(movie_controller_1.default.getOne)
    // .put(controller.updateOne)
    .delete(clearCache_1.default, movie_controller_1.default.deleteOne);
