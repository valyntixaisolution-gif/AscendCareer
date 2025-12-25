import User from '../models/user.model.js';

export async function findUserById(userId) {
  return User.findById(userId);
}
