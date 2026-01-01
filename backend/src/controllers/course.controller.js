import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  getAllCoursesService,
  createCourseService,
  getCourseByIdService,
  updateCourseService,
  deleteCourseService,
  enrollInCourseService,
} from '../services/course.service.js';

export async function getAllCoursesController(req, res) {
  const { courses, totalCourses } = await getAllCoursesService(req.query);

  logger.info(`Fetched ${totalCourses} courses`);

  successResponse(res, 200, 'Courses fetched successfully', courses);
}

export async function createCourseController(req, res) {
  const data = await createCourseService(req.body, req.user);

  logger.info(`Course created with id: ${data.id}`);

  successResponse(res, 201, 'Course created successfully', data);
}

export async function getCourseByIdController(req, res) {
  const data = await getCourseByIdService(req.params);

  logger.info(`Fetched course with id: ${data.id}`);

  successResponse(res, 200, 'Course fetched successfully', data);
}

export async function updateCourseController(req, res) {
  const updatedDate = await updateCourseService(req.params, req.body, req.user);

  logger.info(`Updated course with id: ${updatedDate.id}`);

  successResponse(res, 200, 'Course updated successfully', updatedDate);
}

export async function deleteCourseController(req, res) {
  await deleteCourseService(req.params, req.user);

  logger.info(`Deleted course with id: ${req.params.courseId}`);

  successResponse(res, 200, 'Course deleted successfully');
}

export async function enrollInCourseController(req, res) {
  const data = await enrollInCourseService(req.params, req.user);

  logger.info(
    `User with id: ${req.user.id} enrolled in course with id: ${req.params.courseId}`
  );

  successResponse(res, 200, 'Enrolled in course successfully', data);
}
