import { Router } from 'express';
import requireLogin from '../middlewares/requireLogin';
import clearCache from '../middlewares/clearCache';
import FavMoviesController from '../controllers/FavoriteController';

export const favoriteMoivesRouter = Router();
const movies = new FavMoviesController();

favoriteMoivesRouter.get('/', requireLogin, movies.get);
favoriteMoivesRouter.post('/', requireLogin, clearCache, movies.post);
favoriteMoivesRouter.delete('/:id', requireLogin, clearCache, movies.delete);
