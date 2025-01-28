import session from 'express-session';
const RedisStore = require('connect-redis')(session); // استخدام Redis لتخزين الجلسات
import redisClient from '../../modules/cache/redis/index.js'; // اتصال Redis من ملف config
import { SESSION_SECRET } from '../../config/sessionCookies.config.js'; // اتصال Redis من ملف config
import { NODE_ENV } from '../../config/server.config.js'; // اتصال Redis من ملف config

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET || 'supersecretkey', // المفتاح السري للجلسات
  resave: false, // منع إعادة حفظ الجلسة لو مفيش تغييرات
  saveUninitialized: false, // منع إنشاء جلسات جديدة غير ضرورية
  cookie: {
    secure: NODE_ENV === 'production', // الجلسات تكون آمنة فقط في الإنتاج
    httpOnly: true, // حماية الكوكيز من الـ JavaScript
    maxAge: 1000 * 60 * 60 * 24, // مدة الجلسة: يوم كامل
  },
});

export default sessionMiddleware;
