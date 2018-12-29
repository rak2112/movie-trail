import { Router } from 'express';
import {login, logOut, requestResetToken, resetPassword, signUp} from './';

export const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.get('/login', login);
userRouter.post('/logout', logOut);

userRouter.post('/account/reset/token', requestResetToken);
userRouter.post('/account/reset/:token', resetPassword);