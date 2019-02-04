"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in to perform this action!' });
    }
    next();
};
exports.default = requireLogin;
