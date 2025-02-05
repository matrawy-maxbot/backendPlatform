import redisClient from './config/redis.config.js';
import UserCacheService from './services/UserCache.service.js';
import ProductCacheService from './services/ProductCache.service.js';

export { redisClient, UserCacheService, ProductCacheService };