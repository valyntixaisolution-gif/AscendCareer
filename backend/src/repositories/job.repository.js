const Job = require('../models/job.model');

class JobRepository {
  // Get all jobs
  async getAllJobs(filters = {}) {
    try {
      const jobs = await Job.find(filters)
        .populate('applicants', 'fullName email avatar')
        .sort({ createdAt: -1 });
      return jobs;
    } catch (error) {
      throw new Error(`Error fetching jobs: ${error.message}`);
    }
  }

  // Get job by ID
  async getJobById(jobId) {
    try {
      const job = await Job.findById(jobId).populate(
        'applicants',
        'fullName email avatar'
      );
      return job;
    } catch (error) {
      throw new Error(`Error fetching job: ${error.message}`);
    }
  }

  // Create job
  async createJob(jobData) {
    try {
      const job = new Job(jobData);
      return await job.save();
    } catch (error) {
      throw new Error(`Error creating job: ${error.message}`);
    }
  }

  // Update job
  async updateJob(jobId, updateData) {
    try {
      const job = await Job.findByIdAndUpdate(jobId, updateData, {
        new: true,
        runValidators: true,
      }).populate('applicants', 'fullName email avatar');
      return job;
    } catch (error) {
      throw new Error(`Error updating job: ${error.message}`);
    }
  }

  // Delete job
  async deleteJob(jobId) {
    try {
      const job = await Job.findByIdAndDelete(jobId);
      return job;
    } catch (error) {
      throw new Error(`Error deleting job: ${error.message}`);
    }
  }

  // Add applicant to job
  async addApplicant(jobId, userId) {
    try {
      const job = await Job.findByIdAndUpdate(
        jobId,
        { $addToSet: { applicants: userId } },
        { new: true }
      ).populate('applicants', 'fullName email avatar');
      return job;
    } catch (error) {
      throw new Error(`Error adding applicant: ${error.message}`);
    }
  }

  // Get applicants for a job
  async getApplicants(jobId) {
    try {
      const job = await Job.findById(jobId).populate(
        'applicants',
        'fullName email avatar role'
      );
      return job ? job.applicants : [];
    } catch (error) {
      throw new Error(`Error fetching applicants: ${error.message}`);
    }
  }
}

module.exports = new JobRepository();
