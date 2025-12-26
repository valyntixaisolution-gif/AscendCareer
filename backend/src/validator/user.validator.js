import { z } from 'zod';

export const updateUserSchema = {
  body: z.object({
    fullName: z
      .object({
        firstName: z
          .string()
          .min(1, 'First name is required')
          .max(50, 'First name is too long')
          .optional(),

        lastName: z
          .string()
          .min(1, 'Last name is required')
          .max(50, 'Last name is too long')
          .optional(),
      })
      .optional(),

    displayName: z
      .string()
      .min(1, 'Display name is required')
      .max(100, 'Display name is too long')
      .optional(),

    bio: z.string().max(500, 'Bio is too long').optional(),

    avatar: z.string().url('Invalid avatar URL').optional(),

    address: z
      .object({
        street: z.string().max(100, 'Street is too long').optional(),
        city: z.string().max(50, 'City is too long').optional(),
        state: z.string().max(50, 'State is too long').optional(),
        zipCode: z.string().max(20, 'Zip is too long').optional(),
        country: z.string().max(50, 'Country is too long').optional(),
      })
      .optional(),
  }),
};

export const updatePasswordSchema = {
  body: z
    .object({
      currentPassword: z
        .string()
        .min(8, 'Current password must be at least 8 characters long'),

      newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters long'),

      newPasswordConfirm: z.string(),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
      message: 'New password must be different from current password',
      path: ['newPassword'],
    })
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
      message: 'New password confirmation does not match new password',
      path: ['newPasswordConfirm'],
    }),
};

export const userIdParamSchema = {
  params: z.object({
    userId: z.string('User ID must be provided.'),
  }),
};

export const updateUserByRoleSchema = {
  body: z.object({
    role: z
      .enum(['student', 'trainer', 'company', 'admin', 'super-admin'], {
        errorMap: () => ({
          message:
            'Role must be student, trainer, company, admin, or super-admin',
        }),
      })
      .optional(),
  }),
  params: z.object({
    userId: z.string('User ID must be provided.'),
  }),
};

export const deleteUserSchema = {
  params: z.object({
    userId: z.string('User ID must be provided.'),
  }),
};
