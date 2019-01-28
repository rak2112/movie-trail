"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const awaitHandlerFactory = (middleware) => {
    return (req, res, next) => {
        Promise.resolve(middleware(req, res, next))
            .catch(next);
    };
};
exports.default = awaitHandlerFactory;
