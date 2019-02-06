"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitHandlerFactory = (middleware) => {
    return (req, res, next) => {
        Promise.resolve(middleware(req, res, next))
            .catch(next);
    };
};
