import Course from '../models/course.model';
import User from '../models/user.model';

export async function getAllCourses(
  pageNumber,
  pageSize,
  sortOptions,
  filters
) {
  const skip = (pageNumber - 1) * pageSize;
  const courses = await Course.find(filters)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize)
    .populate('instructor', 'name email');

  const totalCourses = await Course.countDocuments(filters);
  return { courses, totalCourses };
}

export async function createCourse(courseData) {
  return Course.create(courseData);
}

export async function getCourseById(courseId) {
  return Course.findById(courseId)
    .populate('trainer', 'name email')
    .populate('assignments', 'title dueDate')
    .populate('projects', 'title description')
    .lean();
}

export async function getCourseByCourseId(courseId) {
  const course = await Course.findById(courseId);
  return !!course;
}

export async function deleteCourseById(courseId) {
  const result = await Course.findByIdAndDelete(courseId);
  return !!result;
}

export async function isEnrollCourse(courseId, studentId) {
  const course = await User.findOne({ courseId, enrolledCourses: studentId });
  return !!course;
}

export async function createEnrollCourse(courseId, studentId) {
  return User.create({
    _id: studentId,
    $push: { enrolledCourses: courseId },
  });
}
