import User from '../models/user.model.js';

export async function isUserExistByEmail(email) {
  const user = await User.exists({ email });
  return Boolean(user);
}

export async function createUser(userData) {
  return User.create(userData);
}

export async function findUserByEmail(email) {
  return User.findOne({ email }).select('+password');
}

export async function findUserByGoogleId(googleId) {
  return User.findOne({ googleId });
}

export async function findUserByGithubId(githubId) {
  return User.findOne({ githubId });
}

export async function deleteRefreshToken(refreshToken) {
  return User.deleteOne({ refreshToken });
}

export async function findEmailWithTokenAndExpiryDate(token) {
  return User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });
}

export async function isTokenExist(refreshToken) {
  const token = await User.exists({ refreshToken }).select('+refreshToken');
  return Boolean(token);
}

export async function deleteOldRefreshToken(token) {
  return User.deleteOne({ refreshToken: token }).select('+refreshToken');
}

export async function createNewRefreshToken(userId, newRefreshToken) {
  return User.create({
    _id: userId,
    refreshToken: newRefreshToken,
  }).select('+refreshToken');
}

export async function findUserByResetTokenAndExpiryDate(token) {
  return User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });
}

export async function findUserById(userId) {
  return User.findById(userId);
}
