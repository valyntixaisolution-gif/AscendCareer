import rateLimit from 'express-rate-limit';

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler(_req, res) {
    return res.status(429).json({
      success: false,
      statusCode: 429,
      message: 'Too many requests, please try again later.',
      error: 'Too Many Requests',
    });
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler(_req, res) {
    return res.status(429).json({
      success: false,
      statusCode: 429,
      message: 'Too many requests, please try again later.',
      error: 'Too Many Requests',
    });
  },
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.userId || req.ip,
  handler(_req, res) {
    return res.status(429).json({
      success: false,
      statusCode: 429,
      message: 'Too many requests, please try again later.',
      error: 'Too Many Requests',
    });
  },
});
