"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.movieSchema = new mongoose_1.Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    movieType: String,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    userId: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
}, { timestamps: true });
exports.MovieModel = mongoose_1.model('Movie', exports.movieSchema);
