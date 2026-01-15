import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  getAllJobsService,
  getJobByIdService,
  createJobService,
  updateJobService,
  deleteJobService,
  applyForJobService,
  getApplicantsService,
} from '../services/job.service.js';

export async function listJobsController(req, res) {
  const { status, search } = req.query;

  // Build filters
  const filters = {};
  if (status) filters.status = status;
  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const jobs = await getAllJobsService(filters);

  logger.info(`Fetched ${jobs.length} jobs`);

  successResponse(res, 200, 'Jobs fetched successfully', jobs);
}

export async function createJobController(req, res) {
  // Check authorization - only company or admin can create jobs
  if (
    req.user.role !== 'company' &&
    req.user.role !== 'admin' &&
    req.user.role !== 'super-admin'
  ) {
    throw new Error('Not authorized to create jobs');
  }

  const {
    title,
    company,
    location,
    salary,
    description,
    requirements,
    status,
  } = req.body;

  const jobData = {
    title,
    company,
    location,
    salary,
    description,
    requirements: requirements || [],
    status: status || 'open',
  };

  const job = await createJobService(jobData);

  logger.info(`Job created with id: ${job._id}`);

  successResponse(res, 201, 'Job created successfully', job);
}

export async function getJobByIdController(req, res) {
  const job = await getJobByIdService(req.params.jobId);

  logger.info(`Fetched job with id: ${job._id}`);

  successResponse(res, 200, 'Job fetched successfully', job);
}

export async function updateJobController(req, res) {
  const updatedJob = await updateJobService(
    req.params.jobId,
    req.body,
    req.user
  );

  logger.info(`Updated job with id: ${updatedJob._id}`);

  successResponse(res, 200, 'Job updated successfully', updatedJob);
}

export async function deleteJobController(req, res) {
  await deleteJobService(req.params.jobId, req.user);

  logger.info(`Deleted job with id: ${req.params.jobId}`);

  successResponse(res, 200, 'Job deleted successfully');
}

export async function applyForJobController(req, res) {
  // Check authorization - only students can apply
  if (req.user.role !== 'student') {
    throw new Error('Only students can apply for jobs');
  }

  const job = await applyForJobService(req.params.jobId, req.user.id);

  logger.info(`User ${req.user.id} applied for job ${req.params.jobId}`);

  successResponse(res, 200, 'Applied for job successfully', job);
}

export async function getJobApplicantsController(req, res) {
  const applicants = await getApplicantsService(req.params.jobId, req.user);

  logger.info(`Fetched applicants for job ${req.params.jobId}`);

  successResponse(res, 200, 'Applicants fetched successfully', applicants);
}
