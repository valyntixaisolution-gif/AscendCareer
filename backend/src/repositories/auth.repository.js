import User from '../models/user.model';

export async function isUserExiistByEmail(email) {
  return Boolean(User.exists({ email }).lean());
}

export async function createUser(userData) {
  return User.create(userData);
}
