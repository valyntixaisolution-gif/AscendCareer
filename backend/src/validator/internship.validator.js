import { z } from 'zod';
import mongoose from 'mongoose';

export const createInternshipSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company name is required'),
    location: z.string().min(1, 'Location is required').optional(),
    duration: z.string().min(1, 'Duration is required').optional(),
    stipend: z.number().min(0, 'Stipend must be positive').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    requirements: z.array(z.string()).optional(),
    status: z.enum(['open', 'closed']).default('open').optional(),
  }),
};

export const updateInternshipSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    company: z.string().min(1, 'Company name is required').optional(),
    location: z.string().min(1, 'Location is required').optional(),
    duration: z.string().min(1, 'Duration is required').optional(),
    stipend: z.number().min(0, 'Stipend must be positive').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    requirements: z.array(z.string()).optional(),
    status: z.enum(['open', 'closed']).optional(),
  }),
};
