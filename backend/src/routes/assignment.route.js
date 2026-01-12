import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';
import {
  createAssignmentSchema,
  updateAssignmentSchema,
} from '../validator/assignment.validator';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import {
  createAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignment.controller.js';

const router = Router();

router
  .route('/courses/:courseId/assignments')
  .post(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(createAssignmentSchema),
    asyncHandlerMiddleware(createAssignment)
  );

router
  .route('/courses/:courseId/assignments')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(getAssignmentsByCourse)
  );

router
  .route('/assignments/:assignmentId')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(getAssignmentById)
  );

router
  .route('/assignments/:assignmentId')
  .put(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(updateAssignmentSchema),
    asyncHandlerMiddleware(updateAssignment)
  );

router
  .route('/assignments/:assignmentId')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(deleteAssignment)
  );

export default router;
