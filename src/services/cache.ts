import mongoose, { Mongoose } from 'mongoose';
import redis from 'redis';
import { promisify } from 'bluebird';
import { redisUrl, ENVIRONMENT } from '../util/secrets';

const client = redis.createClient(redisUrl);
const getHash = promisify(client.hget).bind(client);
const exec = mongoose.Query.prototype.exec;

if(ENVIRONMENT === 'production') {
  client.auth(process.env.REDIS_PASSWORD, function() {
  });
} 
else {
  client.on('connect', ()=> {
    console.log('Connected to Redis');
  });
}

let redisCaache: any = mongoose.Query.prototype; // :TODO typed error workaround, needs to be fixed!

// mongoose.Query.prototype.cache = fn();
redisCaache.cache = function(options: any = {key: ''} ) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key);
  return this;
}

mongoose.Query.prototype.exec = async function() {
  if(!this.useCache) { return exec.apply(this, arguments); }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name

  });

  const cacheValue: any = await getHash(this.hashKey, key);
  if(cacheValue) {
    return JSON.parse(cacheValue);
  }
  const results = await exec.apply(this, arguments);
  
  client.hset(this.hashKey, key, JSON.stringify(results));
  client.expire(this.hashKey, 100);

  return results;

};

export const clearHash = (hashKey: string) => {
  client.del(JSON.stringify(hashKey))
};