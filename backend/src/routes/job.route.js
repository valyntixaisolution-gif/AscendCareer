import express from 'express';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { asyncHandler } from '../middlewares/async-handler.middleware.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';
import { listJobsSchema, createJobSchema } from '../validator/job.validator.js';
import {
  listJobsController,
  createJobController,
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

export default router;
