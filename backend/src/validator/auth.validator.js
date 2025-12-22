import { z } from 'zod';

export const registerSchema = {
  body: z
    .object({
      fullName: z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
      }),
      email: z.string().email('Invalid email address'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
      confirmPassword: z
        .string()
        .min(8, 'Confirm Password must be at least 8 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
};

export const loginSchema = {
  body: z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
};

export const verifyEmailSchema = {
  query: z.object({
    token: z.string().min(1, 'Verification token is required'),
  }),
};
