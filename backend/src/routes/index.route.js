import { Router } from 'express';
import { successResponse } from '../utils/index.util.js';
import config from '../config/env.config.js';
import logger from '../lib/logger.lib.js';
import mongoose from 'mongoose';
import APIError from '../lib/api-error.lib.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import courseRouter from './course.route.js';
import assignmentRouter from './assignment.route.js';
import projectRouter from './project.route.js';
import internshipRouter from './internship.route.js';

const router = Router();

router.route('/').get((req, res, next) => {
  try {
    successResponse(res, 200, 'AscendCareer API is running successfully', {
      appName: 'AscendCareer API',
      status: process.uptime() > 0 ? 'Running' : 'Stopped',
      timestamp: new Date().toISOString(),
      version: config.APP_VERSION,
      env: config.NODE_ENV,
    });
  } catch (error) {
    logger.error('Error in health check route:', {
      label: 'HealthCheckRoute',
      error: error.message,
    });
    next(new APIError(500, 'Internal Server Error'));
  }
});

router.route('/health').get((req, res, next) => {
  try {
    const dbState =
      mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';

    successResponse(res, 200, 'Health Check Successful', {
      status: 'ok',
      service: 'AscendCareer API',
      environment: config.NODE_ENV,
      database: dbState,
      uptime: process.uptime(),
      memoryUsage: `${process.memoryUsage().heapUsed / 1024 / 1024} MB`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error in /health route:', {
      label: 'HealthRoute',
      error: error.message,
    });
    next(new APIError(500, 'Internal Server Error'));
  }
});

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/courses', courseRouter);
router.use('/api/v1', assignmentRouter);
router.use('/api/v1', projectRouter);
router.use('/api/v1/internships', internshipRouter);

router.use((req, res, next) => {
  logger.warn(`Route not found: ${req.originalUrl}`, {
    label: 'NotFoundRoute',
  });
  next(new APIError(404, 'Route Not Found'));
});

export default router;
