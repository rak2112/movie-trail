import mongoose from 'mongoose';
import { MONGODB_URI } from '../util/secrets';

const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = global.Promise;

export const dbConnection = () => {
  mongoose.connect(mongoUrl, {useMongoClient: true}).then(
    () => { console.log('connected to mongodb', mongoUrl); },
  ).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });
};
