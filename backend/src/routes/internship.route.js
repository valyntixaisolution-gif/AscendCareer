import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import authenticateMiddleware from '../middlewares/authenticate.middleware.js';
import validateRequestMiddleware from '../middlewares/validate-request.middleware.js';
import {
  createInternshipSchema,
  updateInternshipSchema,
} from '../validator/internship.validator.js';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware.js';
import {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyForInternship,
  getApplicants,
  withdrawApplication,
} from '../controllers/internship.controller.js';

const router = Router();

// GET /internships - List internships (All authenticated)
router
  .route('/')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(getAllInternships)
  );

// POST /internships - Create internship (company, admin)
router
  .route('/')
  .post(
    apiRateLimiter,
    authenticateMiddleware(['company', 'admin', 'super-admin']),
    validateRequestMiddleware(createInternshipSchema),
    asyncHandlerMiddleware(createInternship)
  );

// GET /internships/:internshipId - Get internship (All authenticated)
router
  .route('/:internshipId')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(getInternshipById)
  );

// PUT /internships/:internshipId - Update internship (company own, admin)
router
  .route('/:internshipId')
  .put(
    apiRateLimiter,
    authenticateMiddleware(['company', 'admin', 'super-admin']),
    validateRequestMiddleware(updateInternshipSchema),
    asyncHandlerMiddleware(updateInternship)
  );

// DELETE /internships/:internshipId - Delete internship (company own, admin)
router
  .route('/:internshipId')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(['company', 'admin', 'super-admin']),
    asyncHandlerMiddleware(deleteInternship)
  );

// POST /internships/:internshipId/apply - Apply for internship (student)
router
  .route('/:internshipId/apply')
  .post(
    apiRateLimiter,
    authenticateMiddleware(['student']),
    asyncHandlerMiddleware(applyForInternship)
  );

// DELETE /internships/:internshipId/apply - Withdraw application (student)
router
  .route('/:internshipId/apply')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(['student']),
    asyncHandlerMiddleware(withdrawApplication)
  );

// GET /internships/:internshipId/applicants - List applicants (company own, admin)
router
  .route('/:internshipId/applicants')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['company', 'admin', 'super-admin']),
    asyncHandlerMiddleware(getApplicants)
  );

export default router;
