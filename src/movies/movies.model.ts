import { Document, Schema, Model, model } from 'mongoose';

export interface IUser {
 id: string;
}

type MovieType = 'FAVORITE' | 'WATCHLIST';

export interface IMovie extends Document {
 adult: boolean,
 backdrop_path?: string,
 genre_ids: Array<number>,
 id: number,
 movieType: MovieType,
 original_language?: string,
 original_title?: string,
 overview?: string,
 popularity: number,
 poster_path: string,
 release_date: string,
 title: string,
 userId: string,
 video: boolean,
 vote_average: number,
 vote_count: number,
};

export const movieSchema = new Schema({
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

export interface Movie extends Model<IMovie> {
}

export type MovieDocument = IMovie;

export const MovieModel: Model<IMovie> = model<IMovie>('Movie', movieSchema);
