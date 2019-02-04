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

  updateOne(docToUpdate: MovieDocument) {
    return docToUpdate.save();
  },

  deleteOne(docToDelete: MovieDocument) {
    return docToDelete.remove();
  },

  getOne(docToGet: MovieDocument) {
    return Promise.resolve(docToGet)
  },

  getAll(model: any, id: number) {
    return model.find({userId: id}, {userId: 0}).cache({key: id});
  },

  findByParam(model: Movie, id: number) {
    return model.findOne({_id: id})
  }
}

export const createOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => { 
  const { user: { _id: userId }, body } = req;
  const data = JSON.parse(body.data);
  const doc: any = await controllers.createOne(model, {...data, userId});
  res.status(201).json({id: doc._id});
}

export const updateOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  const docToUpdate = req.docFromId;

  try {
    const doc = await controllers.updateOne(docToUpdate);
    res.status(201).json(doc);
  }
  catch(err) {
    next(err);
  }
}

export const deleteOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  await controllers.deleteOne(req.docFromId);
  res.sendStatus(200);
}

export const getOne = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  
  const doc = await controllers.getOne(req.docToUpdate);
  res.status(200).json(doc);
}

export const getAll = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  const { user: {_id: userId} } = req; 
  try {
    const docs: MovieDocument[] = await controllers.getAll(model, userId); //.exec();
    res.json(docs);
  }
  catch(err) {
    next(err);
  }
}

export const findByParam = (model: Movie) => (req: MovieRequest, res: Response, next: NextFunction, id: number) => {
  return controllers.findByParam(model, id)
    .then((doc: MovieDocument) => {
      if (!doc) {
        next(new Error('No document has been found with your given id!'))
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch((error: Error) => {
      next(error)
    })
}

export const findOneAndUpdate = (model: Movie) => async (req: MovieRequest, res: Response, next: NextFunction) => {
  const { body: data, body: { id }, user: {_id: userId} } = req;
  try {
    await model.findOneAndUpdate(
      {id},
      {  $set: {...data}, $addToSet: {users: userId} },
      { upsert: true}).exec();
    res.sendStatus(201);
  }
  catch(err) {
    console.log('error adding user favorite movie', err);
    res.end();
  } 
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

  return {...defaults, ...overrides};
}
