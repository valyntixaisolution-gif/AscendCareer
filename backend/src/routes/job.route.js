import express from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import {
  listJobsSchema,
  createJobSchema,
  getJobByIdSchema,
  updateJobSchema,
  applyJobSchema,
} from '../validator/job.validator.js';
import {
  listJobsController,
  createJobController,
  getJobByIdController,
  updateJobController,
  deleteJobController,
  applyForJobController,
} from '../controllers/job.controller.js';

const router = express.Router();

// GET /jobs - List all jobs (All authenticated users)
router.get(
  '/',
  authenticate,
  validateRequest(listJobsSchema),
  asyncHandler(listJobsController)
);

// POST /jobs - Create new job (company, admin)
router.post(
  '/',
  authenticate,
  validateRequest(createJobSchema),
  asyncHandler(createJobController)
);

// GET /jobs/:jobId - Get single job (All authenticated users)
router.get(
  '/:jobId',
  authenticate,
  validateRequest(getJobByIdSchema),
  asyncHandler(getJobByIdController)
);

// PUT /jobs/:jobId - Update job (admin, super-admin)
router.put(
  '/:jobId',
  authenticate,
  validateRequest(updateJobSchema),
  asyncHandler(updateJobController)
);

// DELETE /jobs/:jobId - Delete job (admin, super-admin)
router.delete(
  '/:jobId',
  authenticate,
  validateRequest(getJobByIdSchema),
  asyncHandler(deleteJobController)
);

// POST /jobs/:jobId/apply - Apply for job (student)
router.post(
  '/:jobId/apply',
  authenticate,
  validateRequest(applyJobSchema),
  asyncHandler(applyForJobController)
);

export default router;
