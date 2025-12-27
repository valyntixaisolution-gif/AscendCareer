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

export async function getCoursesByUserId(
  userId,
  filterOptions,
  sortOptions,
  limitNumber,
  pageNumber
) {
  const skip = (pageNumber - 1) * limitNumber;

  const user = await User.findById(userId).populate({
    path: 'enrolledCourses',
    match: filterOptions,
    options: {
      sort: sortOptions,
      limit: limitNumber,
      skip: skip,
    },
    select:
      'title description category instructor price duration level language assignments projects studentsEnrolled ratings createdAt updatedAt',
  });

  const totalCourse = user.enrolledCourses.length;

  return { courses: user.enrolledCourses, totalCourse };
}
