import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import {isAuthenticated} from '../services/passport';
import {createToken, sendConfirmationEmail, sendPasswordRequestEmail} from '../services/sgMail';


import {User, IUserModel} from '../user';
import { Db } from 'mongodb';

export const loginUser = async (options: any) => {
  const { req, user } = options;
  return new Promise((resolve, reject) => {
    req.logIn(user, (err: Error) => {
      if (err) { return reject(err); }
      const { displayName } = user;
      resolve({ displayName });
    });
  });
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction, strategy = 'basic') => {
  passport.authenticate(strategy, async (err: Error, user: IUserModel, info: IVerifyOptions) => {
    
    if (err) { return res.sendStatus(401)}
    if (!user) { return res.sendStatus(401)}

    const userLogged = await loginUser({req, user});
    res.send(userLogged);

  })(req, res, next);
}

export const login = (req: Request, res: Response, next: NextFunction) => authenticateUser(req, res, next);

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email, displayName }, body: data} = req;
  const userExists: IUserModel = await User.findOne({email});

  if (userExists) {
    res.sendStatus(409);
  }
  else {
    const user = (!displayName) ? {...data, displayName: email} : data;

    try {
      await User.create(user);
    }
    catch(err) {
      console.log('errr in saving user', err);
    }
    authenticateUser(req, res, next, 'local');
  }
}

export const logOut = (req: Request, res: Response) => {
  req.logout();
  req.session.destroy(() => res.sendStatus(200));
};

export const requestResetToken = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { email }, headers: { host } } = req;
  const user: IUserModel = await User.findOne({email});
  const token = JSON.stringify(await createToken());

  if(!user) {
    return res.sendStatus(401);
  }
  user.passwordResetToken = token;
  user.passwordResetExpires = new Date (Date.now() + 3600000 ); // an hr for now...
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
  const userLogged = loginUser({req, res, next, user});
  res.send(userLogged);
}