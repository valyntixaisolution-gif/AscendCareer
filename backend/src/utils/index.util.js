import crypto from 'node:crypto';

export function successResponse(res, statusCode, message, data) {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
}

function formatIssues(issues) {
  return issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));
}

export const validateEnv = (schema, config) => {
  const parsedEnv = schema.safeParse(config);
  if (!parsedEnv.success) {
    const issues = formatIssues(parsedEnv.error.issues);
    console.error('ValidateIssues: ', issues);
  }

  return parsedEnv.data;
};

export function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function generateVerificationExpiry() {
  return new Date(Date.now() + 1000 * 60 * 15);
}
