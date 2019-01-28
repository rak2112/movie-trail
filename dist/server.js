"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// const keys = require('./config/keys');
// import * as cacheService from './services/cache';
// require('./services/cache');
// const router = express.Router();
// Load environment variables from .env file, where API keys and passwords are configured
// // API keys and Passport configuration
// import * as passportConfig from './services/passport';
const PORT = process.env.PORT || 5000;
app_1.default.listen(PORT, () => {
    console.log(`Listening on port`, PORT);
});
exports.default = app_1.default;
