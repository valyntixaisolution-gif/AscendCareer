import { Router } from 'express';
import passport from 'passport';
import {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
  refreshController,
  forgotPasswordController,
  resetPasswordController,
  meController,
  googleAuthController,
} from '../controllers/auth.controller.js';
import { authRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware.js';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  googleAuthSchema,
} from '../validator/auth.validator.js';
import validateRequestMiddleware from '../middlewares/validate-request.middleware.js';
import authenticateMiddleware from '../middlewares/authenticate.middleware.js';

const router = Router();

router
  .route('/register')
  .post(
    authRateLimiter,
    validateRequestMiddleware(registerSchema),
    asyncHandlerMiddleware(registerController)
  );

router
  .route('/login')
  .post(
    authRateLimiter,
    validateRequestMiddleware(loginSchema),
    asyncHandlerMiddleware(loginController)
  );

router
  .route('/logout')
  .post(
    authRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(logoutController)
  );

router
  .route('/verify-email')
  .post(
    authRateLimiter,
    validateRequestMiddleware(verifyEmailSchema),
    asyncHandlerMiddleware(verifyEmailController)
  );

router
  .route('/refresh-token')
  .post(authRateLimiter, asyncHandlerMiddleware(refreshController));

router
  .route('/forgot-password')
  .post(
    authRateLimiter,
    validateRequestMiddleware(forgotPasswordSchema),
    asyncHandlerMiddleware(forgotPasswordController)
  );

router
  .route('/reset-password')
  .post(
    authRateLimiter,
    validateRequestMiddleware(resetPasswordSchema),
    asyncHandlerMiddleware(resetPasswordController)
  );

router
  .route('/me')
  .get(
    authRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(meController)
  );

router
  .route('/google')
  .get(validateRequestMiddleware(googleAuthSchema), (req, res, next) => {
    const role = req.query.role;
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: role,
    })(req, res, next);
  });

router.route('/google/callback').get(
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/v1/auth/google/failure',
  }),

  asyncHandlerMiddleware(googleAuthController)
);

export default router;
