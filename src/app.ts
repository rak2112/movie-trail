import express, { Router } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import { MONGODB_URI, SESSION_SECRET } from './util/secrets';
import {restRouter} from './restRouter';

const MongoStore = mongo(session);
const app = express();
const mongoUrl = MONGODB_URI;

(<any>mongoose).Promise = global.Promise;

 ( async function() {
  try {
    await mongoose.connect(mongoUrl, {useMongoClient: true});
  }
  catch(err) {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ', err);
  }
 })();

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: mongoUrl,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/api', restRouter);

dotenv.config({ path: '.env.variables' });

if (['production', 'CI'].includes(process.env.NODE_ENV)) {
  app.use(express.static('web-app/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('web-app', 'build', 'index.html'));
  });
}

export default app;