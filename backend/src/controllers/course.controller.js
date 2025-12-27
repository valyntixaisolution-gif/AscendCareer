import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  getAllCoursesService,
  createCourseService,
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
