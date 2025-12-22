import User from '../models/user.model.js';

export async function isUserExistByEmail(email) {
  const user = await User.exists({ email });
  return Boolean(user);
}

export async function createUser(userData) {
  return await User.create(userData);
}

export async function findUserByEmail(email) {
  return await User.findOne({ email }).select('+password');
}
