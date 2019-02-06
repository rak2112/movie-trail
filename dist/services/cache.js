"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("redis"));
const bluebird_1 = require("bluebird");
const secrets_1 = require("../util/secrets");
const client = redis_1.default.createClient(secrets_1.redisUrl);
const getHash = bluebird_1.promisify(client.hget).bind(client);
const exec = mongoose_1.default.Query.prototype.exec;
if (secrets_1.ENVIRONMENT === 'production') {
    client.auth(process.env.REDIS_PASSWORD, function () {
        console.log('Authenticated to Redis');
    });
}
else {
    client.on('connect', () => {
        console.log('Connected to Redis');
    });
}
let redisCaache = mongoose_1.default.Query.prototype; // :TODO typed error workaround, needs to be fixed!
// mongoose.Query.prototype.cache = fn();
redisCaache.cache = function (options = { key: '' }) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key);
    return this;
};
mongoose_1.default.Query.prototype.exec = function () {
    return __awaiter(this, arguments, void 0, function* () {
        if (!this.useCache) {
            return exec.apply(this, arguments);
        }
        const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));
        const cacheValue = yield getHash(this.hashKey, key);
        if (cacheValue) {
            console.log('cacheed Value...', cacheValue);
            return JSON.parse(cacheValue);
        }
        const results = yield exec.apply(this, arguments);
        console.log('query resultsss', results);
        client.hset(this.hashKey, key, JSON.stringify(results));
        client.expire(this.hashKey, 100);
        return results;
    });
};
exports.clearHash = (hashKey) => {
    client.del(JSON.stringify(hashKey));
};
