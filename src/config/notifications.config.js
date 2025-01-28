import { object, string, number } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const notificationsSchema = object({
  // Email Notifications
  EMAIL_HOST: string().hostname().required(),
  EMAIL_PORT: number().integer().min(1).max(65535).required(),
  EMAIL_USER: string().required(),
  EMAIL_PASSWORD: string().required(),
  EMAIL_FROM: string().email().required(),

  // SMS (Twilio)
  TWILIO_ACCOUNT_SID: string().required(),
  TWILIO_AUTH_TOKEN: string().required(),
  TWILIO_PHONE_NUMBER: string().required(),

  // Push Notifications (Firebase)
  FIREBASE_API_KEY: string().required(),
  FIREBASE_PROJECT_ID: string().required(),
}).unknown();

const { value: notificationsConfig, error } = notificationsSchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Notifications configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
  );
}

export const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
} = notificationsConfig;
