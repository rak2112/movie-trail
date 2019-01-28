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
const models_1 = require("../models");
class WatchListController {
    constructor() { }
    getWatchList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user: { _id: userId } } = req;
            const results = yield models_1.WatchMovie.find({ users: userId }, { users: 0 });
            //.cache({key: userId}); :TODO redis hosting service for production
            res.json({ results, total: results.length });
        });
    }
    addMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: data, body: { id }, user: { _id: userId } } = req;
            yield models_1.WatchMovie.findOneAndUpdate({ id }, { $set: Object.assign({}, data), $addToSet: { users: userId } }, { upsert: true });
            res.sendStatus(201);
        });
    }
    deleteMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { params: { id }, user: { _id: userId } } = req;
            try {
                yield models_1.WatchMovie.update({ id: id }, { $pullAll: { users: [userId] } });
                res.sendStatus(200);
            }
            catch (_a) {
                res.sendStatus(500);
            }
        });
    }
}
exports.default = WatchListController;
