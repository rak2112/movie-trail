import {model, Model} from 'mongoose';
import { IMovie, movieSchema } from './';

export const WatchMovie: Model<IMovie> = model<IMovie>('WatchMovie', movieSchema);