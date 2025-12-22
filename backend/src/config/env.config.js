import 'dotenv/config';
import { validateEnv } from '../utils/index.util.js';
import { envSchema } from '../validator/env.validator.js';

const envConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  LOG_DIR: process.env.LOG_DIR,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  JWT_REFRESH_TOKEN_EXPIRATION: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_VERSION: process.env.APP_VERSION,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

const config = validateEnv(envSchema, envConfig);

export default config;
