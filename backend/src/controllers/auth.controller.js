import logger from '../lib/logger.lib.js';
import { registerService } from '../services/auth.service.js';
import APIError from '../lib/api-error.lib.js';
import { successResponse } from '../utils/index.util.js';

export const registerController = async (req, res, next) => {
  const newUser = await registerService(req.body);

  if (!newUser) {
    logger.error('Registration failed', {
      label: 'RegisterController',
    });
    return next(new APIError(500, 'Registration failed'));
  }

  logger.info('User registered successfully', {
    label: 'RegisterController',
    userId: newUser._id,
    email: newUser.email,
  });

  successResponse(res, 201, 'User registered successfully', newUser);
};
// export const loginController = (req, res, next) => {
//   /* implementation */
// };
// export const logoutController = (req, res, next) => {
//   /* implementation */
// };
// export const refreshController = (req, res, next) => {
//   /* implementation */
// };
// export const verifyEmailController = (req, res, next) => {
//   /* implementation */
// };
// export const forgotPasswordController = (req, res, next) => {
//   /* implementation */
// };
// export const resetPasswordController = (req, res, next) => {
//   /* implementation */
// };
// export const meController = (req, res, next) => {
//   /* implementation */
// };
