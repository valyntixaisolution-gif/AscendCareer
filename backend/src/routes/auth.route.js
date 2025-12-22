import { Router } from 'express';
import { registerController } from '../controllers/auth.controller.js';
import { authRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware.js';
import { registerSchema } from '../validator/auth.validator.js';
import validateRequestMiddleware from '../middlewares/validate-request.middleware.js';

const router = Router();

router.route(
  '/register',
  authRateLimiter,
  validateRequestMiddleware(registerSchema),
  asyncHandlerMiddleware(registerController)
);
// router.route('/login', asyncHandlerMiddleware(loginController));
// router.route('/logout', asyncHandlerMiddleware(logoutController));
// router.route('/refresh', asyncHandlerMiddleware(refreshController));
// router.route('/verify-email', asyncHandlerMiddleware(verifyEmailController));
// router.route(
//   '/forgot-password',
//   asyncHandlerMiddleware(forgotPasswordController)
// );
// router.route(
//   '/reset-password',
//   asyncHandlerMiddleware(resetPasswordController)
// );
// router.route('/me', asyncHandlerMiddleware(meController));

export default router;
