import { object, string, number } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const sessionCookiesSchema = object({
  SESSION_SECRET: string().required(),
  SESSION_MAX_AGE: number().integer().min(1).required(),
  COOKIE_SECRET: string().required(),
  COOKIE_MAX_AGE: number().integer().min(1).required(),
}).unknown(); // السماح بمتغيرات إضافية

// التحقق من القيم
const { value: sessionCookiesConfig, error } = sessionCookiesSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
    throw new Error(
        `Session Cookies configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
    );
}

export const {
    SESSION_SECRET,
    SESSION_MAX_AGE,
    COOKIE_SECRET,
    COOKIE_MAX_AGE,
} = sessionCookiesConfig;
