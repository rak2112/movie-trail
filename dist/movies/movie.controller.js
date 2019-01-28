"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const movies_model_1 = require("../movies/movies.model");
exports.default = services_1.generateControllers(movies_model_1.MovieModel);
