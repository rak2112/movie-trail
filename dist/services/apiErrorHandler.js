"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send(error.message || error.toString());
};
