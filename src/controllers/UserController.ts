import passport from 'passport';
import { User, IUserModel } from '../user';
import { Request, Response, NextFunction } from 'express';
import { IVerifyOptions } from 'passport-local';
import {isAuthenticated} from '../services/passport';
import {createToken, sendConfirmationEmail, sendPasswordRequestEmail} from '../services/sgMail';


export default class UserController {
  constructor() {}
  
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { body: { email, displayName }, body: data} = req;
    const userExists: IUserModel = await User.findOne({email});
    if (userExists) {
      res.send({status: 409, res: `Account with that email address already exists.`});
    } 
    else {
      try {
        await new User(data).save();
        res.send(displayName);
      }
      catch(err) {
        res.end();
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (err: Error, user: IUserModel, info: IVerifyOptions) => {
      if (err) { return res.statusCode = 401; }
      if (!user) { return res.statusCode = 401; }

      req.logIn(user, (err) => {
        if (err) { return next(err); }
        const { displayName } = user;
        res.send({displayName});
      });
    })(req, res, next);
  }

  async logout (req: Request, res: Response) {
    req.logout();
    res.sendStatus(200);
  };

  async requestResetToken (req: Request, res: Response, next: NextFunction) {
    const { body: { email }, headers: { host } } = req;
    const user: IUserModel = await User.findOne({email}).exec();
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

  async resetPassword (req: Request, res: Response, next: NextFunction) {
    const { body: { password }, params: {token} } = req;
    const user: IUserModel = await User
      .findOne({passwordResetToken: JSON.stringify(token)})
      .where('passwordResetExpires').gt(Date.now())
      .exec();
    if(!user) {
      return res.send({message: 'Password reset token is invalid or has expired.'});
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    await sendConfirmationEmail(user);
    res.sendStatus(200);
  }
}