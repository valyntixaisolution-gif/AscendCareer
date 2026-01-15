import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  addApplicant,
  getApplicants,
} from '../repositories/job.repository.js';

export async function getAllJobsService(filters = {}) {
  const jobs = await getAllJobs(filters);

  if (jobs.length === 0) {
    logger.error('No jobs found', { label: 'JobService' });
    throw new APIError(404, 'No jobs found');
  }

  return jobs;
}

export async function getJobByIdService(jobId) {
  if (!jobId) {
    logger.error('Job ID is required', { label: 'JobService' });
    throw new APIError(400, 'Job ID is required');
  }

  const job = await getJobById(jobId);

  if (!job) {
    logger.error(`Job not found with id: ${jobId}`, { label: 'JobService' });
    throw new APIError(404, 'Job not found');
  }

  return job;
}

export async function createJobService(jobData) {
  if (!jobData.title || !jobData.company) {
    logger.error('Title and company are required fields', {
      label: 'JobService',
    });
    throw new APIError(400, 'Title and company are required fields');
  }

  const job = await createJob(jobData);

  logger.info(`Job created with id: ${job._id}`, { label: 'JobService' });

  return job;
}

export async function updateJobService(jobId, updateData, user) {
  const job = await getJobById(jobId);

  if (!job) {
    logger.error(`Job not found with id: ${jobId}`, { label: 'JobService' });
    throw new APIError(404, 'Job not found');
  }

  // Check authorization - only admin/super-admin can update
  if (user.role !== 'admin' && user.role !== 'super-admin') {
    logger.error(`User ${user.id} not authorized to update job ${jobId}`, {
      label: 'JobService',
    });
    throw new APIError(403, 'Not authorized to update this job');
  }

  const updatedJob = await updateJob(jobId, updateData);

  logger.info(`Job updated with id: ${jobId}`, { label: 'JobService' });

  return updatedJob;
}

export async function deleteJobService(jobId, user) {
  const job = await getJobById(jobId);

  if (!job) {
    logger.error(`Job not found with id: ${jobId}`, { label: 'JobService' });
    throw new APIError(404, 'Job not found');
  }

  // Check authorization - only admin/super-admin can delete
  if (user.role !== 'admin' && user.role !== 'super-admin') {
    logger.error(`User ${user.id} not authorized to delete job ${jobId}`, {
      label: 'JobService',
    });
    throw new APIError(403, 'Not authorized to delete this job');
  }

  await deleteJob(jobId);

  logger.info(`Job deleted with id: ${jobId}`, { label: 'JobService' });
}

export async function applyForJobService(jobId, userId) {
  const job = await getJobById(jobId);

  if (!job) {
    logger.error(`Job not found with id: ${jobId}`, { label: 'JobService' });
    throw new APIError(404, 'Job not found');
  }

  // Check if already applied
  const hasApplied = job.applicants.some(
    (applicant) => applicant._id.toString() === userId
  );

  if (hasApplied) {
    logger.error(`User ${userId} already applied for job ${jobId}`, {
      label: 'JobService',
    });
    throw new APIError(400, 'Already applied for this job');
  }

  const updatedJob = await addApplicant(jobId, userId);

  logger.info(`User ${userId} applied for job ${jobId}`, {
    label: 'JobService',
  });

  return updatedJob;
}

export async function getApplicantsService(jobId, user) {
  const job = await getJobById(jobId);

  if (!job) {
    logger.error(`Job not found with id: ${jobId}`, { label: 'JobService' });
    throw new APIError(404, 'Job not found');
  }

  // Check authorization - only admin/super-admin/company can view applicants
  if (
    user.role !== 'admin' &&
    user.role !== 'super-admin' &&
    user.role !== 'company'
  ) {
    logger.error(
      `User ${user.id} not authorized to view applicants for job ${jobId}`,
      { label: 'JobService' }
    );
    throw new APIError(403, 'Not authorized to view applicants');
  }

  const applicants = await getApplicants(jobId);

  return applicants;
}
