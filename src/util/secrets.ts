import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.debug('Using .env.variables file to supply config environment variables');
    dotenv.config({ path: '.env.variables' });
}
export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === 'production';



export const SESSION_SECRET = process.env['SESSION_SECRET'];

export const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];

export const redisUrl = prod ? process.env['REDIS_URI'] : process.env['REDIS_LOCAL'];

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if(!redisUrl) {
  logger.error('no redis connection found.');
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  process.exit(1);
}