"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const _1 = require("./");
exports.WatchMovie = mongoose_1.model('WatchMovie', _1.movieSchema);
