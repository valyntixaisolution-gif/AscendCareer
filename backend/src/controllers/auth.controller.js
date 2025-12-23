import cookieLib from '../lib/cookie.lib.js';
import logger from '../lib/logger.lib.js';
import {
  loginService,
  registerService,
  logoutService,
  verifyEmailService,
  refreshTokenService,
  forgotPasswordService,
  resetPasswordService,
  meService,
  googleAuthService,
  githubAuthService,
} from '../services/auth.service.js';
import { successResponse } from '../utils/index.util.js';
import APIError from '../lib/api-error.lib.js';
import jwtLib from '../lib/jwt.lib.js';

export async function registerController(req, res) {
  const newUser = await registerService(req.body);

  logger.info('User registered successfully', {
    label: 'RegisterController',
    userId: newUser._id,
    email: newUser.email,
    role: newUser.role,
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

export async function logoutController(req, res, next) {
  const refreshToken = cookieLib.getCookie(req, 'refreshToken');

  if (!refreshToken) {
    logger.warn('No refresh token found in cookies', {
      label: 'LogoutController',
    });
    return next(new APIError(400, 'No refresh token found in cookies'));
  }

  const payload = jwtLib.verifyRefreshToken(refreshToken);

  const logout = await logoutService(refreshToken);

  if (!logout) {
    logger.error('Error during logout process', {
      label: 'LogoutController',
    });
    return next(new APIError(500, 'Error during logout process'));
  }

  cookieLib.clearCookie(res, 'refreshToken');

  logger.info('User logged out successfully', {
    label: 'LogoutController',
    userId: payload.userId,
  });

  successResponse(res, 200, 'User logged out successfully');
}

export async function verifyEmailController(req, res) {
  const verifyUser = await verifyEmailService(req.query);

  logger.info('Email verified successfully', {
    label: 'VerifyEmailController',
    userId: verifyUser._id,
    email: verifyUser.email,
  });

  successResponse(res, 200, 'Email verified successfully', verifyUser);
}

export async function refreshController(req, res, next) {
  const refreshToken = cookieLib.getCookie(req, 'refreshToken');

  if (!refreshToken) {
    logger.warn('No refresh token found in cookies', {
      label: 'RefreshController',
    });
    return next(new APIError(400, 'No refresh token found in cookies'));
  }

  const { newAccessToken, newRefreshToken } =
    await refreshTokenService(refreshToken);

  cookieLib.setCookie(res, 'refreshToken', newRefreshToken);

  logger.info('Token refreshed successfully', {
    label: 'RefreshController',
  });

  successResponse(res, 200, 'Token refreshed successfully', {
    accessToken: newAccessToken,
  });
}

export async function forgotPasswordController(req, res) {
  const forgotPassword = await forgotPasswordService(req.body);

  logger.info('Password reset link sent successfully', {
    label: 'ForgotPasswordController',
    email: req.body.email,
  });

  successResponse(
    res,
    200,
    'Password reset link sent successfully',
    forgotPassword
  );
}

export async function resetPasswordController(req, res) {
  await resetPasswordService(req.body, req.query);

  logger.info('Password reset successfully', {
    label: 'ResetPasswordController',
    email: req.body.email,
  });

  successResponse(res, 200, 'Password reset successfully');
}

export async function meController(req, res) {
  const { userId } = req.user;

  const user = await meService(userId);

  logger.info('Fetched current user details successfully', {
    label: 'MeController',
    userId: user._id,
    email: user.email,
  });

  successResponse(res, 200, 'Fetched current user details successfully', user);
}

export async function googleAuthController(req, res, next) {
  const user = req.user;

  if (!user) {
    logger.error('Google authentication failed', {
      label: 'GoogleAuthController',
    });
    return next(new APIError(500, 'Google authentication failed'));
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const { userId, accessToken, refreshToken } =
    await googleAuthService(payload);

  cookieLib.setCookie(res, 'refreshToken', refreshToken);

  logger.info('User authenticated via Google successfully', {
    label: 'GoogleAuthController',
    userId,
    email: user.email,
  });

  successResponse(res, 200, 'User authenticated via Google successfully', {
    userId,
    accessToken,
  });
}

export async function githubAuthController(req, res, next) {
  const user = req.user;

  if (!user) {
    logger.error('Github authentication failed', {
      label: 'GithubAuthController',
    });
    return next(new APIError(500, 'Github authentication failed'));
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const { userId, accessToken, refreshToken } =
    await githubAuthService(payload);

  cookieLib.setCookie(res, 'refreshToken', refreshToken);

  logger.info('User authenticated via Github successfully', {
    label: 'GithubAuthController',
    userId,
    email: user.email,
  });

  successResponse(res, 200, 'User authenticated via Github successfully', {
    userId,
    accessToken,
  });
}
