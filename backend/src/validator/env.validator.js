import { z } from 'zod';

export const envSchema = z.object({
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
});
