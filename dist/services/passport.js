"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import keys from '../config/keys';
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_facebook_1 = __importDefault(require("passport-facebook"));
const user_1 = require("../user");
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const lodash_1 = __importDefault(require("lodash"));
const passport_http_1 = __importDefault(require("passport-http"));
console.log('passportHttpppppp', passport_http_1.default);
const BasicStrategy = passport_http_1.default.BasicStrategy;
const LocalStrategy = passport_local_1.default.Strategy;
const FacebookStrategy = passport_facebook_1.default.Strategy;
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    console.log('serializing userrrr', user);
    if (user) {
        done(undefined, user.id);
    }
});
passport_1.default.deserializeUser((id, done) => {
    console.log('Deserializing userrrr', id);
    if (id) {
        user_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    }
});
passport_1.default.use(new BasicStrategy(function (email, password, done) {
    user_1.User.findOne({ email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (err) {
            return done(err);
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(true, false);
        });
    });
}));
passport_1.default.use('local', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    console.log('in passport service', email);
    user_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
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
passport_1.default.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
    console.log('faaaccceeboook userrrrrr', req);
    if (req.user) {
        user_1.User.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                done(err);
            }
            else {
                user_1.User.findById(req.user.id, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    user.facebook = profile.id;
                    user.tokens = user.tokens.concat({ kind: 'facebook', accessToken });
                    user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.usePushEach = true;
                    user.save((err) => {
                        req.flash('info', { msg: 'Facebook account has been linked.' });
                        done(err, user);
                    });
                });
            }
        });
    }
    else {
        user_1.User.findOne({ facebook: profile.id }, (err, existingUser) => {
            if (err) {
                return done(err);
            }
            if (existingUser) {
                return done(undefined, existingUser);
            }
            user_1.User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
                if (err) {
                    return done(err);
                }
                if (existingEmailUser) {
                    req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
                    done(err);
                }
                else {
                    const user = new user_1.User();
                    user.email = profile._json.email;
                    user.facebook = profile.id;
                    user.tokens.push({ kind: 'facebook', accessToken });
                    user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                    user.profile.gender = profile._json.gender;
                    user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                    user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                    user.save((err) => {
                        console.log('errrr in savinggg', err);
                        done(err, user);
                    });
                }
            });
        });
    }
}));
exports.isAuthenticated = (req, res, next) => {
    console.log('req in isAuthenticated.....', req.get('authorization'), 'is sier', req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    return res.send({ status: 403, msg: 'user not authorized' });
};
exports.isAuthorized = (req, res, next) => {
    console.log('reeeeqq in fb', req.user);
    const provider = req.path.split('/').slice(-1)[0];
    if (lodash_1.default.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
