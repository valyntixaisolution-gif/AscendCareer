import Job from '../models/job.model.js';

export async function getAllJobs(filters = {}) {
  const jobs = await Job.find(filters)
    .populate('applicants', 'fullName email avatar')
    .sort({ createdAt: -1 });
  return jobs;
}

export async function getJobById(jobId) {
  const job = await Job.findById(jobId).populate(
    'applicants',
    'fullName email avatar'
  );
  return job;
}

export async function createJob(jobData) {
  const job = new Job(jobData);
  return await job.save();
}

export async function updateJob(jobId, updateData) {
  const job = await Job.findByIdAndUpdate(jobId, updateData, {
    new: true,
    runValidators: true,
  }).populate('applicants', 'fullName email avatar');
  return job;
}

export async function deleteJob(jobId) {
  const job = await Job.findByIdAndDelete(jobId);
  return job;
}

export async function addApplicant(jobId, userId) {
  const job = await Job.findByIdAndUpdate(
    jobId,
    { $addToSet: { applicants: userId } },
    { new: true }
  ).populate('applicants', 'fullName email avatar');
  return job;
}

export async function getApplicants(jobId) {
  const job = await Job.findById(jobId).populate(
    'applicants',
    'fullName email avatar role'
  );
  return job ? job.applicants : [];
}
