import { Router } from 'express';
import { awaitHandlerFactory } from './../util/awaithandler';
import WatchListController from '../controllers/WatchListController';
import requireLogin from '../middlewares/requireLogin';
import clearCache from '../middlewares/clearCache';

export const watchListRouter = Router();
const movies = new WatchListController();

watchListRouter.get('/', requireLogin, awaitHandlerFactory(movies.getWatchList));
watchListRouter.post('/', requireLogin, clearCache, awaitHandlerFactory (movies.addMovie));
watchListRouter.delete('/:id', requireLogin, clearCache, awaitHandlerFactory (movies.deleteMovie));
