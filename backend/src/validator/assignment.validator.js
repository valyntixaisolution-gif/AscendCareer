import { z } from 'zod';
import mongoose from 'mongoose';

export const createAssignmentSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    course: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid course ID',
    }),
    dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
    maxMarks: z.number().default(100).optional(),
  }),
};

export const updateAssignmentSchema = {
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    dueDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),
    maxMarks: z.number().optional(),
  }),
};
