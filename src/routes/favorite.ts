import { Router } from 'express';
import { awaitHandlerFactory } from '../util/awaithandler';
import requireLogin from '../middlewares/requireLogin';
import clearCache from '../middlewares/clearCache';
import FavMoviesController from '../controllers/FavoriteController';

export const favoriteMoivesRouter = Router();
const movies = new FavMoviesController();

favoriteMoivesRouter.get('/', requireLogin, movies.get);
favoriteMoivesRouter.post('/', requireLogin, clearCache, awaitHandlerFactory(movies.post));
favoriteMoivesRouter.delete('/:id', requireLogin, clearCache, awaitHandlerFactory(movies.delete));
