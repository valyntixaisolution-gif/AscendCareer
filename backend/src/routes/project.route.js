import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import authenticateMiddleware from '../middlewares/authenticate.middleware.js';
import validateRequestMiddleware from '../middlewares/validate-request.middleware.js';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validator/project.validator.js';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware.js';
import {
  createProject,
  getProjectsByCourse,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';

const router = Router();

// POST /courses/:courseId/projects - Create project (trainer own course, admin)
router
  .route('/courses/:courseId/projects')
  .post(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    validateRequestMiddleware(createProjectSchema),
    asyncHandlerMiddleware(createProject)
  );

// GET /courses/:courseId/projects - List projects (enrolled students, trainer own course)
router
  .route('/courses/:courseId/projects')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['student', 'trainer', 'admin', 'super-admin']),
    asyncHandlerMiddleware(getProjectsByCourse)
  );

// GET /projects/:projectId - Get project (enrolled students, trainer own course)
router
  .route('/projects/:projectId')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['student', 'trainer', 'admin', 'super-admin']),
    asyncHandlerMiddleware(getProjectById)
  );

// PUT /projects/:projectId - Update project (trainer own course, admin)
router
  .route('/projects/:projectId')
  .put(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    validateRequestMiddleware(updateProjectSchema),
    asyncHandlerMiddleware(updateProject)
  );

// DELETE /projects/:projectId - Delete project (trainer own course, admin)
router
  .route('/projects/:projectId')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(['trainer', 'admin', 'super-admin']),
    asyncHandlerMiddleware(deleteProject)
  );

export default router;
