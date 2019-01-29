import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IUserModel extends Document {
  email: string,
  password: string,
  displayName: string,
  passwordResetToken: string,
  passwordResetExpires: Date,

  facebook: string,
  google: string,
  googleId: string,
  // tokens: AuthToken[],
  usePushEach: Boolean,

  profile: {
    name: string,
    gender: string,
    location: string,
    website: string,
    picture: string
  },
  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
  gravatar: (size: number) => string
};

export type AuthToken = {
  accessToken: string,
  kind: string
};

const userSchema = new Schema({
  email: { type: String, unique: true },
  displayName: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  googleId: String,
  // tokens: Array,
  usePushEach: Boolean,

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  }
}, { timestamps: true });

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) { console.log('crypttooooo', this);
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

userSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
// https://github.com/Automattic/mongoose/issues/2471
userSchema.set('autoIndex', false);
export const User: Model<IUserModel> = model<IUserModel>('User', userSchema);
