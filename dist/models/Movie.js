"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
;
exports.movieSchema = new mongoose_1.Schema({
    adult: Boolean,
    backdrop_path: String,
    genre_ids: Array,
    id: Number,
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    userId: String,
    users: [{ type: String }],
    video: Boolean,
    vote_average: Number,
    vote_count: Number
}, { timestamps: true });
// export const MovieModel = Model<IMovie>;
exports.FavMovie = mongoose_1.model('FavMovie', exports.movieSchema);
