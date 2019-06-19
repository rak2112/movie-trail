// import keys from '../config/keys';
import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import passportFacebook from 'passport-facebook';
import passportGoogle from 'passport-google-oauth20';
import _ from 'lodash';
import passportHttp from 'passport-http';

import { User } from '../user';

const BasicStrategy = passportHttp.BasicStrategy;
const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const GoogleStrategy = passportGoogle.Strategy;


passport.serializeUser<any, any>((user, done) => {
  if(user) {
    done(undefined, user.id);
  }
});

passport.deserializeUser((id, done) => {
  if(id) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  }
});

passport.use(new BasicStrategy(
  function(email: string, password: string, done) {
    User.findOne({ email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (err) { return done(err); }

      user.comparePassword(password, (err: Error, isMatch: boolean): any => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(true, false);
      });
    });
  }
));

passport.use('local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  
  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }

      return done(true, false);
    });
  });
}));

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_SECRET,
//   callbackURL: '/auth/google/redirect',
//   }, async (accessToken: any, refreshToken: any, profile: any, done: Function) => {
//    const user = await  (accessToken, profile);
//    done(undefined, user);
//   })
// );


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  if (req.user) {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user: any) => {
          if (err) { return done(err); }
          user.facebook = profile.id;
          user.tokens = user.tokens.concat({ kind: 'facebook', accessToken });
          user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.usePushEach = true;
          user.save((err: Error) => {
            req.flash('info', { msg: 'Facebook account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(undefined, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
          done(err);
        } else {
          const user: any = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: 'facebook', accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : '';
          user.save((err: Error) => {
            done(err, user);
          });
        }
      });
    });
  }
}));

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.send({status: 403, msg: 'user not authorized'});
};


export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
