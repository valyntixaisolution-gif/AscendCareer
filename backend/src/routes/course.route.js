import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import {
  getAllCoursesController,
  createCourseController,
} from '../controllers/course.controller';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';
import {
  getAllCoursesSchema,
  createCourseSchema,
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

router.route('/:courseId').get(apiRateLimiter);

router.route('/:courseId').put();

router.route('/:courseId').delete();

router.route('/:courseId/enroll').post();

router.route('/:courseId/students').get();

export default router;
