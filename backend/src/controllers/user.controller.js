import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util';
import { meService } from '../services/user.service.js';
import APIError from '../lib/api-error.lib.js';
import {
  updateMeService,
  updateAvatarMeService,
  updatePasswordMeService,
  getAllUsersService,
  getUserByIdService,
  updateUserRoleService,
  deleteUserService,
  getUserCoursesService,
} from '../services/user.service.js';

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

export async function updateMeController(req, res, next) {
  const { userId } = req.user;

  if (!userId) {
    logger.error('User ID not found in request', {
      label: 'UpdateMeController',
    });
    return next(
      new APIError(400, 'User ID not found in request', {
        type: 'InvalidRequest',
        details: [
          {
            field: 'userId',
            message: 'User ID is required',
          },
        ],
      })
    );
  }

  const updateData = await updateMeService(userId, req.body);

  logger.info('Updated current user details successfully', {
    label: 'UpdateMeController',
    userId: updateData._id,
    email: updateData.email,
  });

  successResponse(
    res,
    200,
    'Updated current user details successfully',
    updateData
  );
}

export async function updateAvatarMeController(req, res, next) {
  const { userId } = req.user;

  if (!userId) {
    logger.error('User ID not found in request', {
      label: 'UpdateAvatarMeController',
    });
    return next(
      new APIError(400, 'User ID not found in request', {
        type: 'InvalidRequest',
        details: [
          {
            field: 'userId',
            message: 'User ID is required',
          },
        ],
      })
    );
  }

  if (!req.file) {
    logger.error('No file uploaded for avatar update', {
      label: 'UpdateAvatarMeController',
      userId,
    });
    return next(
      new APIError(400, 'No file uploaded for avatar update', {
        type: 'InvalidRequest',
        details: [
          {
            field: 'avatar',
            message: 'Avatar file is required',
          },
        ],
      })
    );
  }

  const updateAvatar = await updateAvatarMeService(userId, req.file.buffer);

  logger.info('Updated avatar successfully', {
    label: 'UpdateAvatarMeController',
    userId: updateAvatar._id,
    email: updateAvatar.email,
  });

  successResponse(res, 200, 'Updated avatar successfully', updateAvatar);
}

export async function updatePasswordMeController(req, res, next) {
  const { userId } = req.user;

  if (!userId) {
    logger.error('User ID not found in request', {
      label: 'UpdatePasswordMeController',
    });
    return next(
      new APIError(400, 'User ID not found in request', {
        type: 'InvalidRequest',
        details: [
          {
            field: 'userId',
            message: 'User ID is required',
          },
        ],
      })
    );
  }

  const updatePassword = await updatePasswordMeService(userId, req.body);

  logger.info('Updated password successfully', {
    label: 'UpdatePasswordMeController',
    userId: updatePassword._id,
    email: updatePassword.email,
  });

  successResponse(res, 200, 'Updated password successfully', updatePassword);
}

export async function getAllUsersController(req, res) {
  const users = await getAllUsersService();

  logger.info('Fetched all users successfully', {
    label: 'GetAllUsersController',
    userCount: users.length,
  });

  successResponse(res, 200, 'Fetched all users successfully', users);
}

export async function getUserByIdController(req, res) {
  const user = await getUserByIdService(req.params);

  logger.info('Fetched user by ID successfully', {
    label: 'GetUserByIdController',
    userId: user._id,
    email: user.email,
  });

  successResponse(res, 200, 'Fetched user by ID successfully', user);
}

export async function updateUserByRoleController(req, res) {
  const updatedRole = await updateUserRoleService(req.body, req.params);

  logger.info('Updated user role successfully', {
    label: 'UpdateUserByRoleController',
    userId: updatedRole._id,
    email: updatedRole.email,
  });

  successResponse(res, 200, 'Updated user role successfully', updatedRole);
}

export async function deleteUserController(req, res) {
  const deletedUser = await deleteUserService(req.params);

  logger.info('Deleted user successfully', {
    label: 'DeleteUserController',
    userId: deletedUser._id,
    email: deletedUser.email,
  });

  successResponse(res, 200, 'Deleted user successfully');
}

export async function getUserCoursesController(req, res) {
  const data = await getUserCoursesService(req.user.userId, req.query);

  logger.info('Fetched user courses successfully', {
    label: 'GetUserCoursesController',
    userId: req.user.userId,
    courseCount: data.length,
  });

  successResponse(res, 200, 'Fetched user courses successfully', data);
}
