"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const clearCache_1 = __importDefault(require("../middlewares/clearCache"));
const FavoriteController_1 = __importDefault(require("../controllers/FavoriteController"));
exports.favoriteMoivesRouter = express_1.Router();
const movies = new FavoriteController_1.default();
exports.favoriteMoivesRouter.get('/', requireLogin_1.default, movies.get);
exports.favoriteMoivesRouter.post('/', requireLogin_1.default, clearCache_1.default, movies.post);
exports.favoriteMoivesRouter.delete('/:id', requireLogin_1.default, clearCache_1.default, movies.delete);
