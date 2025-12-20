import jwt from 'jsonwebtoken';
import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';

const { TokenExpiredError, JsonWebTokenError, NotBeforeError } = jwt;

const globalErrorHandlerMiddleware = (err, _req, res, _next) => {
  let customError;

  if (err instanceof JsonWebTokenError) {
    logger.error('JWT Error occurred', {
      label: 'GlobalErrorHandlerMiddleware',
      error: err.message,
    });

    customError = new APIError(
      401,
      'Authentication failed. Invalid token provided.',
      {
        type: 'JsonWebTokenError',
        details: [{ field: 'token', message: err.message }],
      },
      err.stack
    );
  } else if (err instanceof TokenExpiredError) {
    logger.error('JWT Token Expired', {
      label: 'GlobalErrorHandlerMiddleware',
      error: err.message,
    });

    customError = new APIError(
      401,
      'Authentication failed. Token has expired.',
      {
        type: 'TokenExpiredError',
        details: [{ field: 'token', message: err.message }],
      },
      err.stack
    );
  } else if (err instanceof NotBeforeError) {
    logger.error('JWT Not Before Error', {
      label: 'GlobalErrorHandlerMiddleware',
      error: err.message,
    });

    customError = new APIError(
      401,
      'Authentication failed. Token not active yet.',
      {
        type: 'NotBeforeError',
        details: [{ field: 'token', message: err.message }],
      },
      err.stack
    );
  } else if (err instanceof APIError) {
    logger.error('API Error occurred', {
      label: 'GlobalErrorHandlerMiddleware',
      error: err.message,
    });

    customError = err;
  } else {
    logger.error('Unknown Error occurred', {
      label: 'GlobalErrorHandlerMiddleware',
      error: err?.message,
    });

    customError = new APIError(
      500,
      err?.message || 'Internal Server Error',
      undefined,
      err?.stack
    );
  }

  res.status(customError.statusCode).json({
    success: customError.success,
    statusCode: customError.statusCode,
    message: customError.message,
    error: customError.error,
  });
};

export default globalErrorHandlerMiddleware;
