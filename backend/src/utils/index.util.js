export class APIError extends Error {
  constructor(
    statusCode = 500,
    message = 'Internal Server Error',
    error,
    stack
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function successResponse(res, statusCode, message, data) {
  res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
}
