import {Document, Schema, Model} from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import requireLogin from "../middlewares/requireLogin";
import { Movie, MovieDocument } from '../movies/movies.model';
// import merge from 'lodash.merge' 
interface MovieRequest extends Request {
  docFromId: MovieDocument;
  docToUpdate: MovieDocument;
  _id: string;
}
export const controllers = {
  createOne(model: Movie, body: any) {
    return model.create(body)
  },

  updateOne(docToUpdate: MovieDocument, update: any) {
    // merge(docToUpdate, update)
    return docToUpdate.save()
  },

  deleteOne(docToDelete: MovieDocument) {
    return docToDelete.remove()
  },

  getOne(docToGet: MovieDocument) {
    return Promise.resolve(docToGet)
  },

  getAll(model: any, id: number) {
    return model.find({userId: id}, {userId: 0}); //.cache({key: id});
  },

  findByParam(model: Movie, id: number) {
    return model.findOne({_id: id})
  }
}

export const createOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => { 
  const { user: { _id: userId }, body } = req; console.log('req boddyy in crreate', body.data);
  const data = JSON.parse(body.data);
  const doc: any = await controllers.createOne(model, {...data, userId})
    .catch(error => next(error));
  res.status(201).json({id: doc._id});
}

export const updateOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model: Movie) => (req: MovieRequest, res: Response, next: NextFunction) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(200).json())
    .catch(error => next(error))
}

export const getOne = (model: Movie) => (req: MovieRequest, res: Response, next: NextFunction) => {
  return controllers.getOne(req.docToUpdate)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model: Movie) => (req: MovieRequest, res: Response, next: NextFunction) => { console.log('userrr', req.user);
  const { user: {_id: userId} } = req; 
  return controllers.getAll(model, userId)
    .then((docs: MovieDocument[]) => res.json(docs))
    .catch((error: Error) => next(error))
}

export const findByParam = (model: Movie) => (req: MovieRequest, res: Response, next: NextFunction, id: number) => { console.log('reqqqqqqqqqq', id);
  return controllers.findByParam(model, id)
    .then((doc: MovieDocument) => { console.log('doccc', doc);
      if (!doc) {
        next(new Error('Not Found Error'))
      } else { console.log('reqqqqqqqqqq', req.docFromId);
        req.docFromId = doc;
        next()
      }
    })
    .catch((error: Error) => {
      next(error)
    })
}

export const findOneAndUpdate = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  console.log('reqqq', req.user);
  const { body: data, body: { id }, user: {_id: userId} } = req;
    await model.findOneAndUpdate(
      {id},
      {  $set: {...data}, $addToSet: {users: userId} },
      { upsert: true})
      .catch((err: Error) => console.log('error adding user favorite movie', err));
    res.sendStatus(201);
}


export const generateControllers = (model: Movie, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
    findOneAndUpdate: findOneAndUpdate(model)
  }

  return {...defaults, ...overrides}
}
