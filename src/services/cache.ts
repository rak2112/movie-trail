import mongoose from 'mongoose';
import redis from 'redis';
import { promisify } from 'bluebird';
import { redisUrl } from '../util/secrets';

const client = redis.createClient(redisUrl);
const getHash = promisify(client.hget).bind(client);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {key: ''} ) {
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
    console.log('cacheed Value...', cacheValue);
    return JSON.parse(cacheValue);
  }
  const results = await exec.apply(this, arguments);
  console.log('query resultsss', results);
  client.hset(this.hashKey, key, JSON.stringify(results));
  client.expire(this.hashKey, 100);

  return results;

};

export const clearHash = (hashKey: string) => {
  client.del(JSON.stringify(hashKey))
};