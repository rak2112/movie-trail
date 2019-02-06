import { Router } from 'express';
import { awaitHandlerFactory } from './../util/awaitHandler';
import UserController from '../controllers/UserController';

export const userRouter = Router();
const user = new UserController();

userRouter.post('/signup', awaitHandlerFactory (user.signUp));
userRouter.post('/login', awaitHandlerFactory (user.login));
userRouter.post('/logout', awaitHandlerFactory (user.logout));

userRouter.post('/account/reset/token', awaitHandlerFactory (user.requestResetToken));
userRouter.post('/account/reset/:token', awaitHandlerFactory (user.resetPassword));
