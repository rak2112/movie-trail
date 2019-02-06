"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { awaitHandlerFactory } from './../util/awaithandler';
const WatchListController_1 = __importDefault(require("../controllers/WatchListController"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const clearCache_1 = __importDefault(require("../middlewares/clearCache"));
exports.watchListRouter = express_1.Router();
const movies = new WatchListController_1.default();
exports.watchListRouter.get('/', requireLogin_1.default, movies.getWatchList);
exports.watchListRouter.post('/', requireLogin_1.default, clearCache_1.default, movies.addMovie);
exports.watchListRouter.delete('/:id', requireLogin_1.default, clearCache_1.default, movies.deleteMovie);
