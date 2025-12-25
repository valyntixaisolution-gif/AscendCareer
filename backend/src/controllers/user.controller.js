import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util';
import { meService } from '../services/user.service.js';

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
