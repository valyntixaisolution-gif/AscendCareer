import { z } from 'zod';

export const getAllCoursesSchema = {
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    sort: z.string().optional(),
    category: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    search: z.string().optional(),
  }),
};

export const createCourseSchema = {
  body: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(20),
    category: z.string().min(3).max(50),
    price: z.number().min(0).optional(),
    duration: z.string().min(1).max(50).optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    thumbnailUrl: z.string().optional(),
    language: z.string().min(2).max(30).optional(),
    isPublished: z.boolean().optional(),
  }),
};

export const getCourseByIdSchema = {
  params: z.object({
    courseId: z.string('Invalid course ID'),
  }),
};

export const updateCourseSchema = {
  body: z.object({
    title: z.string().min(5).max(100).optional(),
    description: z.string().min(20).optional(),
    category: z.string().min(3).max(50).optional(),
    price: z.number().min(0).optional(),
    duration: z.string().min(1).max(50).optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    thumbnailUrl: z.string().optional(),
    language: z.string().min(2).max(30).optional(),
    isPublished: z.boolean().optional(),
  }),
  params: z.object({
    courseId: z.string('Invalid course ID'),
  }),
};
