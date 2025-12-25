import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import { meController } from '../controllers/user.controller.js';

const router = Router();

router
  .route('/me')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(meController)
  );

router.route('/me').put();

router.route('/me/avatar').put();

router.route('/').get();

router.route('/:userId').get();

router.route('/:userId/role').put();

router.route('/:userId').delete();

export default router;
