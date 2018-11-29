import { Request, Response, NextFunction } from 'express';
import { FavMovie, IMovie } from '../models';

export default class FavMoviesController {
  constructor() {}

  async get(req: Request, res: Response) {
    const { user: {_id: userId} } = req;
    const results: IMovie[] = await FavMovie.find({users: userId}, {users: 0}).cache({key: userId});
    console.log('resultsss', results);
    return res.json({results, total: results.length});
  }

  async post(req: Request, res: Response) {
    const { body: data, body: { id }, user: {_id: userId} } = req;
    await FavMovie.findOneAndUpdate(
      {id},
      {  $set: {...data}, $addToSet: {users: userId} },
      { upsert: true})
      .catch(err => console.log('error adding user favorite movie', err));
    res.sendStatus(201);
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

