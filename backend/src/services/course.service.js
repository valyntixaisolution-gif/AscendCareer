import APIError from '../lib/api-error.lib';
import logger from '../lib/logger.lib';
import { getAllCourses, createCourse } from '../repositories/course.repository';

export async function getAllCoursesService(queryData) {
  const { page, limit, sort, category, level, search } = queryData;

  const pageNumber = page || 1;
  const pageSize = limit || 10;
  const filters = {};
  if (category) filters.category = category;
  if (level) filters.level = level;
  if (search) filters.title = { $regex: search, $options: 'i' };

  let sortOptions = { createdAt: -1 };
  if (sort === 'price_low') sortOptions = { price: 1 };
  if (sort === 'price_high') sortOptions = { price: -1 };
  if (sort === 'rating') sortOptions = { averageRating: -1 };

  const { courses, totalCourses } = await getAllCourses(
    pageNumber,
    pageSize,
    sortOptions,
    filters
  );

  if (courses.length === 0) {
    logger.error('No courses found with the given criteria', {
      label: 'CourseService',
    });

    throw new APIError(404, 'No courses found with the given criteria');
  }

  return { courses, totalCourses };
}

export async function createCourseService(courseData, user) {
  let trainerId;

  if (user.role === 'trainer') {
    trainerId = user.id;
  } else {
    if (!courseData.trainer) {
      logger.error('Trainer ID must be provided by admin', {
        label: 'CourseService',
      });
      throw new APIError(400, 'Trainer ID must be provided by admin');
    }
    trainerId = courseData.trainer;
  }
  const course = await createCourse({
    ...courseData,
    trainer: trainerId,
  });

  if (!course) {
    logger.error('Course creation failed', {
      label: 'CourseService',
    });

    throw new APIError(500, 'Course creation failed');
  }

  return course;
}
