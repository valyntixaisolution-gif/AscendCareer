import { z } from 'zod';
import mongoose from 'mongoose';

export const createProjectSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    course: z
      .string()
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid course ID',
      })
      .optional(),
    assignedTo: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid user ID',
        })
      )
      .optional(),
    status: z
      .enum(['pending', 'in progress', 'completed'])
      .default('pending')
      .optional(),
    githubLink: z.string().url('Invalid GitHub URL').optional(),
    submissionUrl: z.string().url('Invalid submission URL').optional(),
    marks: z.number().min(0, 'Marks must be positive').optional(),
    feedback: z.string().optional(),
  }),
};

export const updateProjectSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    assignedTo: z
      .array(
        z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
          message: 'Invalid user ID',
        })
      )
      .optional(),
    status: z.enum(['pending', 'in progress', 'completed']).optional(),
    githubLink: z.string().url('Invalid GitHub URL').optional(),
    submissionUrl: z.string().url('Invalid submission URL').optional(),
    marks: z.number().min(0, 'Marks must be positive').optional(),
    feedback: z.string().optional(),
  }),
};
