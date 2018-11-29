import { Router } from 'express';
import clearCache from '../middlewares/clearCache';
import controller from './movie.controller';

export const moviesRouter = Router();

moviesRouter.param('id', controller.findByParam)

moviesRouter.route('/')
  .get(controller.getAll)
  .post(clearCache, controller.createOne)
  //.post(controller.createOne)

moviesRouter.route('/:id')
  .get(controller.getOne)
  // .put(controller.updateOne)
  .delete(clearCache, controller.deleteOne)
