import User from '../models/user.model.js';

export async function findUserById(userId) {
  return User.findById(userId);
}

export async function findUserByIdAndUpdate(userId, updateData) {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select('-password -refresh');
}

export async function findAllUsers() {
  return User.find().select('-password -refresh');
}

export async function deleteUserById(userId) {
  return User.findByIdAndDelete(userId);
}
