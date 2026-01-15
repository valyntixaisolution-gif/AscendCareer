const jobService = require('../services/job.service');
const { ApiError } = require('../lib/api-error.lib');

class JobController {
  // GET /jobs - List all jobs
  async listJobs(req, res, next) {
    try {
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

      const jobs = await jobService.getAllJobs(filters);

      res.status(200).json({
        success: true,
        message: 'Jobs fetched successfully',
        data: jobs,
        count: jobs.length,
      });
    } catch (error) {
      next(new ApiError(error.message, 500));
    }
  }
}

module.exports = new JobController();
