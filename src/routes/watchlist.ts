import { Router } from 'express';
// import { awaitHandlerFactory } from './../util/awaithandler';
import WatchListController from '../controllers/WatchListController';
import requireLogin from '../middlewares/requireLogin';
import clearCache from '../middlewares/clearCache';

export const watchListRouter = Router();
const movies = new WatchListController();

watchListRouter.get('/', requireLogin, movies.getWatchList);
watchListRouter.post('/', requireLogin, clearCache, movies.addMovie);
watchListRouter.delete('/:id', requireLogin, clearCache, movies.deleteMovie);
