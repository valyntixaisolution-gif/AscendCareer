import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  createAssignmentService,
  getAssignmentsByCourseService,
  getAssignmentByIdService,
  updateAssignmentService,
  deleteAssignmentService,
} from '../services/assignment.service.js';

export async function createAssignment(req, res) {
  const assignment = await createAssignmentService(req.params, req.body);

  logger.info(`Assignment created with ID: ${assignment.id}`);

  successResponse(res, 201, 'Assignment created successfully', assignment);
}

export async function getAssignmentsByCourse(req, res) {
  const assignments = await getAssignmentsByCourseService(req.params);

  logger.info(`Fetched assignments for course: ${req.params.courseId}`);

  successResponse(res, 200, 'Assignments fetched successfully', assignments);
}

export async function getAssignmentById(req, res) {
  const assignment = await getAssignmentByIdService(req.params);

  logger.info(`Fetched assignment with ID: ${req.params.assignmentId}`);

  successResponse(res, 200, 'Assignment fetched successfully', assignment);
}

export async function updateAssignment(req, res) {
  const assignment = await updateAssignmentService(req.params, req.body);

  logger.info(`Assignment updated with ID: ${req.params.assignmentId}`);

  successResponse(res, 200, 'Assignment updated successfully', assignment);
}

export async function deleteAssignment(req, res) {
  await deleteAssignmentService(req.params);

  logger.info(`Assignment deleted with ID: ${req.params.assignmentId}`);

  successResponse(res, 200, 'Assignment deleted successfully');
}
