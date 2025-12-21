import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import logger from './logger.lib.js';
import APIError from './api-error.lib.js';

function signToken(payload, secret, options = {}) {
  return jwt.sign(payload, secret, options);
}

function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    logger.error('JWT Verification Error:', error.message);
    throw new APIError(401, 'Invalid or expired token', error);
  }
}

const jwtLib = {
  generateAccessToken(payload) {
    return signToken(payload, config.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRATION,
    });
  },
  generateRefreshToken(payload) {
    return signToken(payload, config.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: config.JWT_REFRESH_TOKEN_EXPIRATION,
    });
  },
  verifyAccessToken(token) {
    return verifyToken(token, config.JWT_ACCESS_TOKEN_SECRET);
  },
  verifyRefreshToken(token) {
    return verifyToken(token, config.JWT_REFRESH_TOKEN_SECRET);
  },
};

export default jwtLib;
