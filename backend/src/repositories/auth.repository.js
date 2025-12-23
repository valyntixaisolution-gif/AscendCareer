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

export async function findUserByGoogleId(googleId) {
  return await User.findOne({ googleId });
}

export async function findUserByGithubId(githubId) {
  return await User.findOne({ githubId });
}

export async function deleteRefreshToken(refreshToken) {
  return await User.deleteOne({ refreshToken });
}

export async function findEmailWithTokenAndExpiryDate(token) {
  return await User.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });
}

export async function isTokenExist(refreshToken) {
  const token = await User.exists({ refreshToken }).select('+refreshToken');
  return Boolean(token);
}

export async function deleteOldRefreshToken(token) {
  return await User.deleteOne({ refreshToken: token }).select('+refreshToken');
}

export async function createNewRefreshToken(userId, newRefreshToken) {
  return await User.create({
    _id: userId,
    refreshToken: newRefreshToken,
  }).select('+refreshToken');
}

export async function findUserByResetTokenAndExpiryDate(token) {
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiry: { $gt: Date.now() },
  });
}

export async function findUserById(userId) {
  return await User.findById(userId);
}
