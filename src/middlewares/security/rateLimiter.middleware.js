import rateLimit from 'express-rate-limit';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from '../../config/security.config.js';

const rateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS, // نافذة زمنية
  max: RATE_LIMIT_MAX_REQUESTS,   // الحد الأقصى للطلبات
  message: 'Too many requests, please try again later.',
});

export default rateLimiter;
