import { z } from 'zod';

export const registerSchema = {
  body: z
    .object({
      fullName: z.object({
        first: z.string().min(1, 'First name is required'),
        last: z.string().min(1, 'Last name is required'),
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
