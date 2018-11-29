import express from 'express'
import {apiErrorHandler } from './services/apiErrorHandler';
import requireLogin from './middlewares/requireLogin';
import { moviesRouter } from './movies';
import { userRouter } from './user';


export const restRouter = express.Router()

restRouter.use('/user', userRouter)
restRouter.use('/movies', requireLogin, moviesRouter);
restRouter.use(apiErrorHandler);

