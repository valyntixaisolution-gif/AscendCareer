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
