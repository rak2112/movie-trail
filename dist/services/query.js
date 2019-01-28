"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = {
    createOne(model, body) {
        return model.create(body);
    },
    updateOne(docToUpdate, update) {
        // merge(docToUpdate, update)
        return docToUpdate.save();
    },
    deleteOne(docToDelete) {
        return docToDelete.remove();
    },
    getOne(docToGet) {
        return Promise.resolve(docToGet);
    },
    getAll(model, id) {
        return model.find({ userId: id }, { userId: 0 }).cache({ key: id });
    },
    findByParam(model, id) {
        return model.findOne({ _id: id });
    }
};
exports.createOne = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { user: { _id: userId }, body } = req;
    console.log('req boddyy in crreate', body.data);
    const data = JSON.parse(body.data);
    const doc = yield exports.controllers.createOne(model, Object.assign({}, data, { userId }))
        .catch(error => next(error));
    res.status(201).json({ id: doc._id });
});
exports.updateOne = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const docToUpdate = req.docFromId;
    const update = req.body;
    return exports.controllers.updateOne(docToUpdate, update)
        .then(doc => res.status(201).json(doc))
        .catch(error => next(error));
});
exports.deleteOne = (model) => (req, res, next) => {
    return exports.controllers.deleteOne(req.docFromId)
        .then(doc => res.status(200).json())
        .catch(error => next(error));
};
exports.getOne = (model) => (req, res, next) => {
    return exports.controllers.getOne(req.docToUpdate)
        .then(doc => res.status(200).json(doc))
        .catch(error => next(error));
};
exports.getAll = (model) => (req, res, next) => {
    console.log('userrr', req.user);
    const { user: { _id: userId } } = req;
    return exports.controllers.getAll(model, userId)
        .then((docs) => res.json(docs))
        .catch((error) => next(error));
};
exports.findByParam = (model) => (req, res, next, id) => {
    console.log('reqqqqqqqqqq', id);
    return exports.controllers.findByParam(model, id)
        .then((doc) => {
        console.log('doccc', doc);
        if (!doc) {
            next(new Error('Not Found Error'));
        }
        else {
            console.log('reqqqqqqqqqq', req.docFromId);
            req.docFromId = doc;
            next();
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.findOneAndUpdate = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('reqqq', req.user);
    const { body: data, body: { id }, user: { _id: userId } } = req;
    yield model.findOneAndUpdate({ id }, { $set: Object.assign({}, data), $addToSet: { users: userId } }, { upsert: true })
        .catch((err) => console.log('error adding user favorite movie', err));
    res.sendStatus(201);
});
exports.generateControllers = (model, overrides = {}) => {
    const defaults = {
        findByParam: exports.findByParam(model),
        getAll: exports.getAll(model),
        getOne: exports.getOne(model),
        deleteOne: exports.deleteOne(model),
        updateOne: exports.updateOne(model),
        createOne: exports.createOne(model),
        findOneAndUpdate: exports.findOneAndUpdate(model)
    };
    return Object.assign({}, defaults, overrides);
};
