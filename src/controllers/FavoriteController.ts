import { Request, Response, NextFunction } from 'express';
import { FavMovie, IMovie } from '../models';

export default class FavMoviesController {
  constructor() {}

  async get(req: Request, res: Response) {
    const { user: {_id: userId} } = req;
    const results: IMovie[] = await FavMovie.find({users: userId}, {users: 0}); // caching resources error .cache({key: userId});
    return res.json({results, total: results.length});
  }

  async post(req: Request, res: Response) {
    const { body: data, body: { id }, user: {_id: userId} } = req;
    try {
      await FavMovie.findOneAndUpdate(
        {id},
        {  $set: {...data}, $addToSet: {users: userId} },
        { upsert: true})
      res.sendStatus(201);
    }
    catch(err) {
      res.end();
    }
    
  }

  async delete(req: Request, res: Response) {
    const { params: {id}, user: { _id: userId } } = req;
    try {
      await FavMovie.update({id: id}, {$pullAll: {users: [userId]} });
      res.sendStatus(200);
    } catch { 
      res.sendStatus(500);
    }
  }
}