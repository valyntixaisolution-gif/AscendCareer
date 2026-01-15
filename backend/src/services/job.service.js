const jobRepository = require('../repositories/job.repository');

class JobService {
  // Get all jobs with optional filters
  async getAllJobs(filters = {}) {
    try {
      const jobs = await jobRepository.getAllJobs(filters);
      return jobs;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get job by ID
  async getJobById(jobId) {
    try {
      if (!jobId) {
        throw new Error('Job ID is required');
      }
      const job = await jobRepository.getJobById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Create new job
  async createJob(jobData) {
    try {
      if (!jobData.title || !jobData.company) {
        throw new Error('Title and company are required fields');
      }
      const job = await jobRepository.createJob(jobData);
      return job;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Update job
  async updateJob(jobId, updateData, userId, userRole) {
    try {
      const job = await jobRepository.getJobById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      // Check authorization - only company (owner) or admin can update
      if (userRole !== 'admin' && userRole !== 'super-admin') {
        // If not admin, check if user is the owner (you may need to add createdBy field to job model)
        throw new Error('Not authorized to update this job');
      }

      const updatedJob = await jobRepository.updateJob(jobId, updateData);
      return updatedJob;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Delete job
  async deleteJob(jobId, userRole) {
    try {
      const job = await jobRepository.getJobById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      // Check authorization - only company (owner) or admin can delete
      if (userRole !== 'admin' && userRole !== 'super-admin') {
        throw new Error('Not authorized to delete this job');
      }

      const deletedJob = await jobRepository.deleteJob(jobId);
      return deletedJob;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Apply for job
  async applyForJob(jobId, userId) {
    try {
      const job = await jobRepository.getJobById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      // Check if already applied
      if (job.applicants.includes(userId)) {
        throw new Error('Already applied for this job');
      }

      const updatedJob = await jobRepository.addApplicant(jobId, userId);
      return updatedJob;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Get applicants for a job
  async getApplicants(jobId, userRole) {
    try {
      const job = await jobRepository.getJobById(jobId);
      if (!job) {
        throw new Error('Job not found');
      }

      // Check authorization - only company (owner) or admin can view applicants
      if (
        userRole !== 'admin' &&
        userRole !== 'super-admin' &&
        userRole !== 'company'
      ) {
        throw new Error('Not authorized to view applicants');
      }

      const applicants = await jobRepository.getApplicants(jobId);
      return applicants;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new JobService();
