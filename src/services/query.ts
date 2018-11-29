import requireLogin from "../middlewares/requireLogin";

// import merge from 'lodash.merge'

export const controllers = {
  createOne(model, body) {
    return model.create(body)
  },

  updateOne(docToUpdate, update) {
    // merge(docToUpdate, update)
    return docToUpdate.save()
  },

  deleteOne(docToDelete) {
    return docToDelete.remove()
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet)
  },

  getAll(model, id) {
    return model.find({userId: id}, {users: 0}).cache({key: id});
  },

  findByParam(model, id) {
    return model.findOne({_id: id})
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
}

export const deleteOne = (model) => (req, res, next) => {
  return controllers.deleteOne(req.docFromId)
    .then(doc => res.status(200).json())
    .catch(error => next(error))
}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(req.docToUpdate)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))
}

export const getAll = (model) => (req, res, next) => { console.log('userrr', req.user);
  const { user: {_id: userId} } = req; 
  return controllers.getAll(model, userId)
    .then(docs => res.json(docs))
    .catch(error => next(error))
}

export const findByParam = (model) => (req, res, next, id) => { console.log('reqqqqqqqqqq', id);
  return controllers.findByParam(model, id)
    .then(doc => { console.log('doccc', doc);
      if (!doc) {
        next(new Error('Not Found Error'))
      } else { console.log('reqqqqqqqqqq', req.docFromId);
        req.docFromId = doc;
        next()
      }
    })
    .catch(error => {
      next(error)
    })
}

export const findOneAndUpdate = (model) => async (req, res, next) => {
  console.log('reqqq', req.user);
  const { body: data, body: { id }, user: {_id: userId} } = req;
    await model.findOneAndUpdate(
      {id},
      {  $set: {...data}, $addToSet: {users: userId} },
      { upsert: true})
      .catch(err => console.log('error adding user favorite movie', err));
    res.sendStatus(201);
}


export const generateControllers = (model, overrides = {}) => {
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
