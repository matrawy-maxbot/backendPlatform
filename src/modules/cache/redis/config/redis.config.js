import Redis from 'ioredis';
import { redis } from '../../../../config/database.config.js';

const redisClient = new Redis({
  host: redis.host,
  port: redis.port,
  password: redis.password,
  db: redis.db,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis successfully.');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;