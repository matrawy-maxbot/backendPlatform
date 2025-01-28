import Redis from 'ioredis';
import { redis } from '../../../config/database.config.js';

const redisClient = new Redis({
  host: redis.host || 'localhost',
  port: redis.port || 6379,
  password: redis.password || '',
});

redisClient.on('connect', () => console.log('Connected to Redis!'));
redisClient.on('error', (err) => console.error('Redis Error:', err));

export default redisClient;
