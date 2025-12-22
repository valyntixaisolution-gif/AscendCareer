import { Router } from 'express';
import {
  registerController,
  loginController,
  logoutController,
  verifyEmailController,
} from '../controllers/auth.controller.js';
import { authRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware.js';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
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
// router.route('/refresh', asyncHandlerMiddleware(refreshController));
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
