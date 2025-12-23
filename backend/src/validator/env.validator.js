import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  LOG_DIR: z.string().default('logs'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info']).default('info'),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(1),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(1),
  JWT_ACCESS_TOKEN_EXPIRATION: z.string().default('15m'),
  JWT_REFRESH_TOKEN_EXPIRATION: z.string().default('7d'),
  DATABASE_URL: z.string().min(1),
  APP_VERSION: z.string().default('1.0.0'),
  EMAIL_HOST: z.string().min(1),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
  BASE_URL: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URI: z.string().min(1),
});

export default envSchema;
