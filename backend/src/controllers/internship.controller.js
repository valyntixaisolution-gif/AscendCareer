import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  createInternshipService,
  getAllInternshipsService,
  getInternshipByIdService,
  updateInternshipService,
  deleteInternshipService,
  applyForInternshipService,
  getApplicantsService,
  withdrawApplicationService,
} from '../services/internship.service.js';

export async function createInternship(req, res) {
  const internship = await createInternshipService(req.body, req.user);

  logger.info(`Internship created with ID: ${internship.id}`);

  successResponse(res, 201, 'Internship created successfully', internship);
}

export async function getAllInternships(req, res) {
  const internships = await getAllInternshipsService();

  logger.info(`Fetched ${internships.length} internships`);

  successResponse(res, 200, 'Internships fetched successfully', internships);
}

export async function getInternshipById(req, res) {
  const internship = await getInternshipByIdService(req.params);

  logger.info(`Fetched internship with ID: ${req.params.internshipId}`);

  successResponse(res, 200, 'Internship fetched successfully', internship);
}

export async function updateInternship(req, res) {
  const internship = await updateInternshipService(
    req.params,
    req.body,
    req.user
  );

  logger.info(`Internship updated with ID: ${req.params.internshipId}`);

  successResponse(res, 200, 'Internship updated successfully', internship);
}

export async function deleteInternship(req, res) {
  await deleteInternshipService(req.params, req.user);

  logger.info(`Internship deleted with ID: ${req.params.internshipId}`);

  successResponse(res, 200, 'Internship deleted successfully');
}

export async function applyForInternship(req, res) {
  const internship = await applyForInternshipService(req.params, req.user);

  logger.info(
    `Student ${req.user.userId} applied for internship ${req.params.internshipId}`
  );

  successResponse(res, 201, 'Applied for internship successfully', internship);
}

export async function getApplicants(req, res) {
  const internship = await getApplicantsService(req.params, req.user);

  logger.info(`Fetched applicants for internship: ${req.params.internshipId}`);

  successResponse(
    res,
    200,
    'Applicants fetched successfully',
    internship.applicants
  );
}

export async function withdrawApplication(req, res) {
  const internship = await withdrawApplicationService(req.params, req.user);

  logger.info(
    `Student ${req.user.userId} withdrew application for internship ${req.params.internshipId}`
  );

  successResponse(res, 200, 'Application withdrawn successfully', internship);
}
