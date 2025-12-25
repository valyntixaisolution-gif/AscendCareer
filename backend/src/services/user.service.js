import logger from '../lib/logger.lib';
import APIError from '../lib/api-error.lib';
import { findUserById } from '../repositories/user.repository';

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
