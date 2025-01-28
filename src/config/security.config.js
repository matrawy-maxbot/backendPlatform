import { object, string, number } from 'joi';

// تعريف Schema للتحقق من الإعدادات
const securitySchema = object({
  // JWT
  JWT_SECRET: string().required(),
  JWT_EXPIRES_IN: string().default('1h'),

  // CORS
  CORS_ORIGIN: string().required(),
  CORS_METHODS: string().default('GET,POST,PUT,DELETE'),
  CORS_HEADERS: string().default('Content-Type,Authorization'),

  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: number().integer().min(1).default(100),
  RATE_LIMIT_WINDOW_MS: number().integer().min(1).default(60000),
}).unknown();

const { value: securityConfig, error } = securitySchema.validate(process.env, {
  abortEarly: false,
});

if (error) {
  throw new Error(
    `Security configuration validation error: ${error.details.map((x) => x.message).join(', ')}`
  );
}

export const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CORS_ORIGIN,
  CORS_METHODS,
  CORS_HEADERS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} = securityConfig;
