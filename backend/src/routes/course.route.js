import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import {
  getAllCoursesController,
  createCourseController,
  updateCourseController,
  deleteCourseController,
  enrollInCourseController,
  getStudentsInCourseController,
} from '../controllers/course.controller';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';
import {
  getAllCoursesSchema,
  createCourseSchema,
  getCourseByIdSchema,
  updateCourseSchema,
} from '../validator/course.validator';

const router = Router();

router
  .route('/')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(getAllCoursesSchema),
    asyncHandlerMiddleware(getAllCoursesController)
  );

router
  .route('/')
  .post(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    validateRequestMiddleware(createCourseSchema),
    asyncHandlerMiddleware(createCourseController)
  );

router
  .route('/:courseId')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(getCourseByIdSchema),
    asyncHandlerMiddleware()
  );

router
  .route('/:courseId')
  .put(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    validateRequestMiddleware(updateCourseSchema),
    asyncHandlerMiddleware(updateCourseController)
  );

router
  .route('/:courseId')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(['admin', 'super-admin']),
    validateRequestMiddleware(getCourseByIdSchema),
    asyncHandlerMiddleware(deleteCourseController)
  );

router
  .route('/:courseId/enroll')
  .post(
    apiRateLimiter,
    authenticateMiddleware(['student']),
    validateRequestMiddleware(getCourseByIdSchema),
    asyncHandlerMiddleware(enrollInCourseController)
  );

router
  .route('/:courseId/students')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    validateRequestMiddleware(getCourseByIdSchema),
    asyncHandlerMiddleware(getStudentsInCourseController)
  );

export default router;
