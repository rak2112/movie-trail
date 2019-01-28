"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("../util/secrets");
const mongoUrl = secrets_1.MONGODB_URI;
mongoose_1.default.Promise = global.Promise;
exports.dbConnection = () => {
    mongoose_1.default.connect(mongoUrl, { useMongoClient: true }).then(() => { console.log('connected to mongodb', mongoUrl); }).catch(err => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        // process.exit();
    });
};
