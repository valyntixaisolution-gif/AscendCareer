import logger from '../lib/logger.lib';
import APIError from '../lib/api-error.lib';
import { findUserById } from '../repositories/user.repository';
import {
  findUserByIdAndUpdate,
  findAllUsers,
  deleteUserById,
  getCoursesByUserId,
} from '../repositories/user.repository';

export async function meService(userId) {
  if (!userId) {
    logger.error('User ID is required', {
      label: 'MeService',
    });
    throw new APIError(400, 'User ID is required');
  }

  const user = await findUserById(userId);

  if (!user) {
    logger.error('User not found', {
      label: 'MeService',
      userId,
    });
    throw new APIError(404, 'User not found');
  }

  return user;
}

export async function updateMeService(userId, updateDate) {
  const updateUser = await findUserByIdAndUpdate(userId, updateDate);

  if (!updateUser) {
    logger.error('Failed to update user', {
      label: 'UpdateMeService',
      userId,
    });
    throw new APIError(500, 'Failed to update user');
  }

  return updateUser;
}

export async function updateAvatarMeService(userId, avatarBuffer) {
  const uploadAvatar = await findUserByIdAndUpdate(userId, {
    avatar: avatarBuffer,
  });

  if (!uploadAvatar) {
    logger.error('Failed to update user avatar', {
      label: 'UpdateAvatarMeService',
      userId,
    });
    throw new APIError(500, 'Failed to update user avatar');
  }

  return uploadAvatar;
}

export async function updatePasswordMeService(userId, passwordDate) {
  const user = await findUserById(userId);

  if (!user) {
    logger.error('User not found', {
      label: 'UpdatePasswordMeService',
      userId,
    });
    throw new APIError(404, 'User not found');
  }

  user.password = passwordDate.newPassword;

  const updatedUser = await user.save();

  if (!updatedUser) {
    logger.error('Failed to update user password', {
      label: 'UpdatePasswordMeService',
      userId,
    });
    throw new APIError(500, 'Failed to update user password');
  }

  return updatedUser;
}

export async function getAllUsersService() {
  const users = await findAllUsers();
  return users;
}

export async function getUserByIdService(userParams) {
  const { userId } = userParams;

  const user = await findUserById(userId);

  if (!user) {
    logger.error('User not found', {
      label: 'GetUserByIdService',
      userId,
    });
    throw new APIError(404, 'User not found');
  }

  return user;
}

export async function updateUserRoleService(updateData, userParams) {
  const { userId } = userParams;
  const { role } = updateData;

  const updatedUserRole = await findUserByIdAndUpdate(userId, { role });

  if (!updatedUserRole) {
    logger.error('Failed to update user role', {
      label: 'UpdateUserRoleService',
      userId,
    });
    throw new APIError(500, 'Failed to update user role');
  }

  return updatedUserRole;
}

export async function deleteUserService(userParams) {
  const { userId } = userParams;

  const deletedUser = await deleteUserById(userId);

  if (!deletedUser) {
    logger.error('Failed to delete user', {
      label: 'DeleteUserService',
      userId,
    });
    throw new APIError(500, 'Failed to delete user');
  }

  return deletedUser;
}

export async function getUserCoursesService(userId, queryData) {
  const { limit, page, category, level, isPublished, sort, order } = queryData;
  const pageNumber = page || 1;
  const limitNumber = limit || 10;

  const filterOptions = {};
  if (category) return (filterOptions.category = category);
  if (level) return (filterOptions.level = level);
  if (isPublished !== undefined)
    return (filterOptions.isPublished = isPublished === 'true');

  const sortOptions = {};
  if (sort) {
    sortOptions[sort] = order === 'asc' ? 1 : -1;
  } else {
    sortOptions.createdAt = -1;
  }
  const courses = await getCoursesByUserId(
    userId,
    filterOptions,
    sortOptions,
    limitNumber,
    pageNumber
  );

  if (!courses) {
    logger.error('User not found', {
      label: 'GetUserCoursesService',
      userId,
    });
    throw new APIError(404, 'User not found');
  }

  return courses;
}
