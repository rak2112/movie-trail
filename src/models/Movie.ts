import { Document, Schema, Model, model } from 'mongoose';

export interface IUser {
 id: string;
};

export type movieType = 'favorite' | ''

export interface IMovie extends Document {
 adult: boolean,
 backdrop_path?: string,
 genre_ids: Array<number>,
 id: number,
 original_language?: string,
 original_title?: string,
 overview?: string,
 popularity: number,
 poster_path: string,
 release_date: string,
 title: string,
 userId: {
  type: Schema.Types.ObjectId,
  ref: 'User'
 },
 type: string,
 users: IUser[],
 video: boolean,
 vote_average: number,
 vote_count: number,
 cache: ()=> void
};

export const movieSchema = new Schema({
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
 users: [{type: String}],
 video: Boolean,
 vote_average: Number,
 vote_count: Number

}, { timestamps: true });

// export const MovieModel = Model<IMovie>;

export const FavMovie: Model<IMovie> = model<IMovie>('FavMovie', movieSchema);