import { RateLimiterMemory } from 'rate-limiter-flexible';
import status from '../../config/status.config.js';

// إعداد الـ Rate Limiter العام لكل المستخدمين
const generalLimiter = new RateLimiterMemory({
    points: 100, // عدد الطلبات المسموحة
    duration: 60, // خلال 60 ثانية (دقيقة واحدة)
});

// إعداد الـ Rate Limiter لمحاولات تسجيل الدخول (أكثر صرامة)
const loginLimiter = new RateLimiterMemory({
    points: 5, // مسموح بـ 5 محاولات فقط
    duration: 60 * 5, // خلال 5 دقائق
});

// ميدل وير عام للحد من الطلبات
const rateLimiterMiddleware = (req, res, next) => {
    generalLimiter.consume(req.ip)
        .then(() => {
            next(); // كمل الطلب عادي
        })
        .catch(() => {
            res.status(status.TOO_MANY_REQUESTS);
            next(new Error('Too many requests, please try again later.'));
        });
};

// ميدل وير خاص بتسجيل الدخول
const loginRateLimiter = (req, res, next) => {
    loginLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
          res.status(status.TOO_MANY_REQUESTS);
          next(new Error('Too many login attempts, please try again later.'));
        });
};

// تصدير الميدل وير
export default { rateLimiterMiddleware, loginRateLimiter };
