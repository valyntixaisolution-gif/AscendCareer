import APIError from '../lib/api-error.lib.js';
import jwtLib from '../lib/jwt.lib.js';
import logger from '../lib/logger.lib.js';

function authenticateMiddleware(allowRoles = []) {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      logger.warn('No authorization header present', {
        label: 'AuthenticateMiddleware',
      });
      return next(
        new APIError(401, 'Unauthorized: No authorization header present')
      );
    }

    const [schema, token] = authorization.split(' ');
    if (schema !== 'Bearer' || !token) {
      logger.warn('Invalid authorization format', {
        label: 'AuthenticateMiddleware',
      });
      return next(
        new APIError(401, 'Unauthorized: Invalid authorization format')
      );
    }

    try {
      const payload = jwtLib.verifyAccessToken(token);

      if (!payload?.userId || !payload?.role) {
        logger.warn('Invalid token payload', {
          label: 'AuthenticateMiddleware',
        });
        return next(new APIError(401, 'Unauthorized: Invalid token payload'));
      }

      req.user = {
        userId: payload.userId,
        role: payload.role,
      };

      if (allowRoles.length > 0 && !allowRoles.includes(payload.role)) {
        logger.warn(`User role ${payload.role} not authorized`, {
          label: 'AuthenticateMiddleware',
          userId: payload.userId,
        });
        return next(new APIError(403, 'Forbidden: User role not authorized'));
      }

      next();
    } catch (error) {
      logger.error('Error verifying access token', {
        label: 'AuthenticateMiddleware',
        error: error.message,
      });
      return next(new APIError(401, 'Unauthorized: Invalid access token'));
    }
  };
}
export default authenticateMiddleware;
