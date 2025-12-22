import cookieLib from '../lib/cookie.lib.js';
import logger from '../lib/logger.lib.js';
import { loginService, registerService } from '../services/auth.service.js';
import { successResponse } from '../utils/index.util.js';

export async function registerController(req, res) {
  const newUser = await registerService(req.body);

  logger.info('User registered successfully', {
    label: 'RegisterController',
    userId: newUser._id,
    email: newUser.email,
  });

  successResponse(res, 201, 'User registered successfully', newUser);
}
export async function loginController(req, res) {
  const { user, accessToken, refreshToken } = await loginService(req.body);

  cookieLib.setCookie(res, 'refreshToken', refreshToken);

  logger.info('User logged in successfully. Please verify your email.', {
    label: 'LoginController',
    userId: user._id,
    email: user.email,
  });

  successResponse(res, 200, 'User logged in successfully', {
    user,
    accessToken,
  });
}
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
