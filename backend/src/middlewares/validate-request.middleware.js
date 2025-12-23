import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';
import { formatIssues } from '../utils/index.util.js';

function validatePart(part, schema, req) {
  if (!schema) return;

  const parsedPart = schema.safeParse(req[part]);

  if (!parsedPart.success) {
    const issues = formatIssues(parsedPart.error.issues);

    logger.error(`${part} Validation Issues:`, {
      type: 'ValidateRequestMiddleware',
      issues,
    });

    throw new APIError(400, 'Validation Error', {
      type: 'ValidateRequestMiddleware',
      issues,
    });
  }

  Object.assign(req[part], parsedPart.data);
}

const validateRequestMiddleware = (schema) => (req, _res, next) => {
  try {
    validatePart('body', schema?.body, req);
    validatePart('query', schema?.query, req);
    validatePart('params', schema?.params, req);

    next();
  } catch (error) {
    logger.error('Request Validation Failed', {
      label: 'ValidateRequestMiddleware',
      error: error.message,
    });
    next(error);
  }
};

export default validateRequestMiddleware;
