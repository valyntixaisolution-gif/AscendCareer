import { z } from 'zod';

export const listJobsSchema = {
  query: z.object({
    status: z.enum(['open', 'closed']).optional(),
    search: z.string().optional(),
  }),
};

export const createJobSchema = {
  body: z.object({
    title: z.string().min(3).max(100, 'Title must be less than 100 characters'),
    company: z
      .string()
      .min(2)
      .max(100, 'Company name must be between 2 and 100 characters'),
    location: z
      .string()
      .min(2)
      .max(100, 'Location must be between 2 and 100 characters')
      .optional(),
    salary: z.number().min(0, 'Salary cannot be negative').optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    requirements: z.array(z.string().min(1)).optional(),
    status: z.enum(['open', 'closed']).optional(),
  }),
};

export const getJobByIdSchema = {
  params: z.object({
    jobId: z.string('Invalid job ID'),
  }),
};

export const updateJobSchema = {
  body: z.object({
    title: z.string().min(3).max(100).optional(),
    company: z.string().min(2).max(100).optional(),
    location: z.string().min(2).max(100).optional(),
    salary: z.number().min(0).optional(),
    description: z.string().min(10).optional(),
    requirements: z.array(z.string().min(1)).optional(),
    status: z.enum(['open', 'closed']).optional(),
  }),
  params: z.object({
    jobId: z.string('Invalid job ID'),
  }),
};

export const applyJobSchema = {
  params: z.object({
    jobId: z.string('Invalid job ID'),
  }),
};

export const getJobApplicantsSchema = {
  params: z.object({
    jobId: z.string('Invalid job ID'),
  }),
};
