import { Router } from 'express';
import { registerController } from '../controllers/auth.controller';
import { authRateLimiter } from '../middlewares/rate-limiting.middleware';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import { registerSchema } from '../validator/auth.validator';
import validateRequestMiddleware from '../middlewares/validate-request.middleware';

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
