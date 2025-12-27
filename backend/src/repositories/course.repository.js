import Course from '../models/course.model';

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
