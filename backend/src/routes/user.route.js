import { Router } from 'express';
import { apiRateLimiter } from '../middlewares/rate-limiting.middleware.js';
import authenticateMiddleware from '../middlewares/authenticate.middleware';
import asyncHandlerMiddleware from '../middlewares/async-handler.middleware';
import {
  meController,
  updateMeController,
  updateAvatarMeController,
  updatePasswordMeController,
  getAllUsersController,
  getUserByIdController,
  updateUserByRoleController,
  deleteUserController,
} from '../controllers/user.controller.js';
import { uploadFields } from '../middlewares/multer.middleware.js';
import validateRequestMiddleware from '../middlewares/validate-request.middleware.js';
import {
  updateUserSchema,
  updateAvatarSchema,
  updatePasswordSchema,
  userIdParamSchema,
  updateUserByRoleSchema,
  deleteUserSchema,
} from '../validator/user.validator.js';

const router = Router();

router
  .route('/me')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(meController)
  );

router
  .route('/me')
  .put(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(updateUserSchema),
    asyncHandlerMiddleware(updateMeController)
  );

router
  .route('/me/avatar')
  .put(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(updateAvatarSchema),
    uploadFields([{ name: 'avatar', maxCount: 1 }]),
    asyncHandlerMiddleware(updateAvatarMeController)
  );

router
  .route('/me/password')
  .put(
    apiRateLimiter,
    authenticateMiddleware(),
    validateRequestMiddleware(updatePasswordSchema),
    asyncHandlerMiddleware(updatePasswordMeController)
  );

router
  .route('/')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['admin', 'super-admin']),
    asyncHandlerMiddleware(getAllUsersController)
  );

router
  .route('/:userId')
  .get(
    apiRateLimiter,
    authenticateMiddleware(['admin', 'super-admin']),
    validateRequestMiddleware(userIdParamSchema),
    asyncHandlerMiddleware(getUserByIdController)
  );

router
  .route('/:userId/role')
  .put(
    apiRateLimiter,
    authenticateMiddleware(['admin', 'super-admin']),
    validateRequestMiddleware(updateUserByRoleSchema),
    asyncHandlerMiddleware(updateUserByRoleController)
  );

router
  .route('/:userId')
  .delete(
    apiRateLimiter,
    authenticateMiddleware(['admin', 'super-admin']),
    validateRequestMiddleware(deleteUserSchema),
    asyncHandlerMiddleware(deleteUserController)
  );

router
  .route('/me/courses')
  .get(
    apiRateLimiter,
    authenticateMiddleware(),
    asyncHandlerMiddleware(getAllUsersController)
  );

export default router;
