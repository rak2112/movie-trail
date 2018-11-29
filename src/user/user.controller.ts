import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import {isAuthenticated} from '../services/passport';
import {createToken, sendConfirmationEmail, sendPasswordRequestEmail} from '../services/sgMail';

import {User, IUserModel} from '../user';


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email, displayName }, body: data} = req; console.log('body', req.body);
    const userExists: IUserModel = await User.findOne({email}); console.log('user already exists', userExists);
    if (userExists) {
      res.sendStatus(409);
    } 
    else {
      const user = (!displayName) ? {...data, displayName: email} : data;
      console.log('userrrr', user);
      await new User(user).save()
        .catch((err) => console.log('error in saving user', err));
      res.send(email);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('basic', (err: Error, user: IUserModel, info: IVerifyOptions) => {
    console.log('userrr', user);
    if (err) { return res.sendStatus(401)}
    if (!user) { return res.sendStatus(401)}

    req.logIn(user, (err) => { console.log('do i ever get here');
      if (err) { return next(err); }
      const { displayName } = user;
      res.send({displayName});
    });
  })(req, res, next);
}

export const logOut = (req: Request, res: Response) => {
  req.logout();
  req.session.destroy(() => res.send(200));
};

export const requestResetToken = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email }, headers: { host } } = req;
  const user: IUserModel = await User.findOne({email});
  const token = JSON.stringify(await createToken());
  if(!user) {
    return res.send({message: 'Account with that email address does not exist.'});
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date (Date.now() + 3600000); // an hr for now...
  await user.save();

  await sendPasswordRequestEmail(email, token, host);
  res.send({message: `An e-mail has been sent to ${email} with further instructions.`});
  
}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { password }, params: {token} } = req;
  const user: IUserModel = await User
    .findOne({passwordResetToken: JSON.stringify(token)})
    .where('passwordResetExpires').gt(Date.now())
    .exec();
  if(!user) {
    return res.sendStatus(401);
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  await sendConfirmationEmail(user);
  res.sendStatus(200);
}