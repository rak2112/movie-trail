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
    updateOne(docToUpdate) {
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
    const data = JSON.parse(body.data);
    const doc = yield exports.controllers.createOne(model, Object.assign({}, data, { userId }));
    res.status(201).json({ id: doc._id });
});
exports.updateOne = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const docToUpdate = req.docFromId;
    try {
        const doc = yield exports.controllers.updateOne(docToUpdate);
        res.status(201).json(doc);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteOne = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield exports.controllers.deleteOne(req.docFromId);
    res.sendStatus(200);
});
exports.getOne = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const doc = yield exports.controllers.getOne(req.docToUpdate);
    res.status(200).json(doc);
});
exports.getAll = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { user: { _id: userId } } = req;
    try {
        const docs = yield exports.controllers.getAll(model, userId); //.exec();
        res.json(docs);
    }
    catch (err) {
        next(err);
    }
});
exports.findByParam = (model) => (req, res, next, id) => {
    return exports.controllers.findByParam(model, id)
        .then((doc) => {
        if (!doc) {
            next(new Error('No document has been found with your given id!'));
        }
        else {
            req.docFromId = doc;
            next();
        }
    })
        .catch((error) => {
        next(error);
    });
};
exports.findOneAndUpdate = (model) => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { body: data, body: { id }, user: { _id: userId } } = req;
    try {
        yield model.findOneAndUpdate({ id }, { $set: Object.assign({}, data), $addToSet: { users: userId } }, { upsert: true }).exec();
        res.sendStatus(201);
    }
    catch (err) {
        console.log('error adding user favorite movie', err);
        res.end();
    }
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
