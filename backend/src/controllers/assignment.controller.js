import logger from '../lib/logger.lib.js';
import { successResponse } from '../utils/index.util.js';
export async function createAssignment(req, res) {
  const assignment = await createAssignmentService(req.params, req.body);

  logger.info(`Assignment created with ID: ${assignment.id}`);

  successResponse(res, 201, 'Assignment created successfully', assignment);
}

// export async function getAssignmentsByCourse(req, res) {}

// export async function getAssignmentById(req, res) {}

// export async function updateAssignment(req, res) {}

// export async function deleteAssignment(req, res) {}
