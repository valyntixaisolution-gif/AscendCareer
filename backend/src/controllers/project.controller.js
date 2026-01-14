import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
import {
  createProjectService,
  getProjectsByCourseService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from '../services/project.service.js';

export async function createProject(req, res) {
  const project = await createProjectService(req.params, req.body, req.user);

  logger.info(`Project created with ID: ${project.id}`);

  successResponse(res, 201, 'Project created successfully', project);
}

export async function getProjectsByCourse(req, res) {
  const projects = await getProjectsByCourseService(req.params, req.user);

  logger.info(`Fetched projects for course: ${req.params.courseId}`);

  successResponse(res, 200, 'Projects fetched successfully', projects);
}

export async function getProjectById(req, res) {
  const project = await getProjectByIdService(req.params, req.user);

  logger.info(`Fetched project with ID: ${req.params.projectId}`);

  successResponse(res, 200, 'Project fetched successfully', project);
}

export async function updateProject(req, res) {
  const project = await updateProjectService(req.params, req.body, req.user);

  logger.info(`Project updated with ID: ${req.params.projectId}`);

  successResponse(res, 200, 'Project updated successfully', project);
}

export async function deleteProject(req, res) {
  await deleteProjectService(req.params, req.user);

  logger.info(`Project deleted with ID: ${req.params.projectId}`);

  successResponse(res, 200, 'Project deleted successfully');
}
