import logger from './logger.lib.js';
import config from '../config/env.config.js';
import APIError from '../lib/api-error.lib.js';

const whiteListSet = new Set(config.CORS_ORIGIN);

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (origin === 'null') {
      if (config.NODE_ENV === 'development') return callback(null, true);
      logger.warn('CORS Rejected: null origin');
      return callback(new APIError(403, 'Not allowed by CORS'));
    }

    const normalized = origin.replace(/\/$/, '').toLowerCase();

    if (config.NODE_ENV === 'development' || whiteListSet.has(normalized)) {
      return callback(null, true);
    }

    logger.warn(`CORS Rejected Origin: ${origin}`);
    return callback(new APIError(403, 'Not allowed by CORS'));
  },

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],

  exposedHeaders: ['Content-Length'],

  credentials: true,

  optionsSuccessStatus: 200,
};

export default corsOptions;
