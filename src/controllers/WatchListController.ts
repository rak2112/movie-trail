import { IMovie, WatchMovie } from '../models';
import { Request, Response, NextFunction } from 'express';

export default class WatchListController {

 constructor() {}
  async getWatchList(req: Request, res: Response, next: NextFunction) {
    const { user: {_id: userId} } = req;
    const results: IMovie[] = await WatchMovie.find({users: userId}, {users: 0}) 
    //.cache({key: userId}); :TODO redis hosting service for production
    res.json({results, total: results.length});
  }

  async addMovie(req: Request, res: Response, next: NextFunction) {
    const { body: data, body: { id }, user: {_id: userId} } = req;
    await WatchMovie.findOneAndUpdate(
      {id},
      {  $set: {...data}, $addToSet: {users: userId} },
      { upsert: true})
    res.sendStatus(201);
  }

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    const { params: {id}, user: { _id: userId } } = req;
    try {
      await WatchMovie.update({id: id}, {$pullAll: {users: [userId]} });
      res.sendStatus(200);
    } catch {
      res.sendStatus(500);
    }
  }
}