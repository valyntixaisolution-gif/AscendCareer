import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';
import { formatIssues } from '../utils/index.util.js';

function validatePart(part, schema, req, next) {
  if (!schema) return true;
  const parsedPart = schema.safeParse(req[part]);

  if (!parsedPart.success) {
    const issues = formatIssues(parsedPart.error.issues);
    logger.error(`${part} Validation Issues: `, {
      type: 'ValidateRequestMiddleware',
      issues,
    });
    next(
      new APIError(400, 'Validation Error', {
        type: 'ValidateRequestMiddleware',
        issues,
      })
    );
    return false;
  }

  req[part] = parsedPart.data;
  return true;
}

const validateRequestMiddleware = (schema) => (req, res, next) => {
  try {
    if (!validatePart('body', schema?.body, req, next)) return;
    if (!validatePart('query', schema?.query, req, next)) return;
    if (!validatePart('params', schema?.params, req, next)) return;

    next();
  } catch (error) {
    logger.error('ValidateRequestMiddleware Error: ', {
      type: 'ValidateRequestMiddleware',
      error,
    });
    next(new APIError(500, 'Internal Server Error'));
  }
};

export default validateRequestMiddleware;
