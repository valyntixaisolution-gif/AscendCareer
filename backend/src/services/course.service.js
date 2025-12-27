import APIError from '../lib/api-error.lib';
import logger from '../lib/logger.lib';
import {
  getAllCourses,
  createCourse,
  getCourseById,
  getCourseByCourseId,
  deleteCourseById,
} from '../repositories/course.repository';

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

export async function getCourseByIdService(paramsData) {
  const { courseId } = paramsData;

  const course = await getCourseById(courseId);

  if (!course) {
    logger.error(`Course with id: ${courseId} not found`, {
      label: 'CourseService',
    });

    throw new APIError(404, 'Course not found');
  }

  return course;
}

export async function updateCourseService(paramsData, bodyData, user) {
  const { courseId } = paramsData;

  const course = await getCourseByCourseId(courseId);

  if (!course) {
    logger.error(`Course with id: ${courseId} not found`, {
      label: 'CourseService',
    });

    throw new APIError(404, 'Course not found');
  }

  if (user.role === 'trainer' && course.trainer.toString() !== user.id) {
    logger.error(
      `Trainer with id: ${user.id} is not authorized to update this course`,
      {
        label: 'CourseService',
      }
    );

    throw new APIError(403, 'You are not authorized to update this course');
  }

  Object.keys(bodyData).forEach((key) => {
    course[key] = bodyData[key];
  });

  const updatedCourse = await course.save();

  if (!updatedCourse) {
    logger.error(`Failed to update course with id: ${courseId}`, {
      label: 'CourseService',
    });

    throw new APIError(500, 'Failed to update course');
  }

  return updatedCourse;
}

export async function deleteCourseService(paramsData, user) {
  const { courseId } = paramsData;

  const course = await getCourseByCourseId(courseId);

  if (!course) {
    logger.error(`Course with id: ${courseId} not found`, {
      label: 'CourseService',
    });

    throw new APIError(404, 'Course not found');
  }

  if (user.role === 'trainer' && course.trainer.toString() !== user.id) {
    logger.error(
      `Trainer with id: ${user.id} is not authorized to delete this course`,
      {
        label: 'CourseService',
      }
    );

    throw new APIError(403, 'You are not authorized to delete this course');
  }
  const deleteCourse = await deleteCourseById(courseId);

  if (!deleteCourse) {
    logger.error(`Failed to delete course with id: ${courseId}`, {
      label: 'CourseService',
    });

    throw new APIError(500, 'Failed to delete course');
  }

  return true;
}
