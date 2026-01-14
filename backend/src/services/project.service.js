import {
  createProject as createProjectRepo,
  getProjectsByCourse as getProjectsByCourseRepo,
  getProjectById as getProjectByIdRepo,
  updateProject as updateProjectRepo,
  deleteProject as deleteProjectRepo,
} from '../repositories/project.repository.js';
import { getCourseById } from '../repositories/course.repository.js';
import User from '../models/user.model.js';
import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';

export async function createProjectService(params, body, user) {
  const { courseId } = params;
  const {
    title,
    description,
    assignedTo,
    status,
    githubLink,
    submissionUrl,
    marks,
    feedback,
  } = body;

  // Verify course exists
  const course = await getCourseById(courseId);
  if (!course) {
    logger.error(`Course with id: ${courseId} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Course not found');
  }

  // Check if trainer owns the course (trainers can only create projects for their own courses)
  if (user.role === 'trainer' && course.trainer.toString() !== user.userId) {
    logger.error(
      `Trainer with id: ${user.userId} is not authorized to create project for this course`,
      {
        label: 'ProjectService',
      }
    );
    throw new APIError(
      403,
      'You are not authorized to create projects for this course'
    );
  }

  const project = await createProjectRepo({
    title,
    description,
    course: courseId,
    assignedTo,
    status,
    githubLink,
    submissionUrl,
    marks,
    feedback,
  });

  return project;
}

export async function getProjectsByCourseService(params, user) {
  const { courseId } = params;

  // Verify course exists
  const course = await getCourseById(courseId);
  if (!course) {
    logger.error(`Course with id: ${courseId} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Course not found');
  }

  // Check authorization
  if (user.role === 'student') {
    // Students can only see projects if they're enrolled in the course
    const student = await User.findById(user.userId);
    if (
      !student ||
      !student.enrolledCourses.some(
        (enrolledCourse) => enrolledCourse.toString() === courseId
      )
    ) {
      logger.error(
        `Student with id: ${user.userId} is not enrolled in course: ${courseId}`,
        {
          label: 'ProjectService',
        }
      );
      throw new APIError(403, 'You are not enrolled in this course');
    }
  } else if (user.role === 'trainer') {
    // Trainers can only see projects for their own courses
    if (course.trainer.toString() !== user.userId) {
      logger.error(
        `Trainer with id: ${user.userId} is not authorized to view projects for this course`,
        {
          label: 'ProjectService',
        }
      );
      throw new APIError(
        403,
        'You are not authorized to view projects for this course'
      );
    }
  }
  // Admin and super-admin can see all projects

  const projects = await getProjectsByCourseRepo(courseId);

  return projects;
}

export async function getProjectByIdService(params, user) {
  const { projectId } = params;

  const project = await getProjectByIdRepo(projectId);
  if (!project) {
    logger.error(`Project with id: ${projectId} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Project not found');
  }

  // Verify course exists
  const course = await getCourseById(project.course.toString());
  if (!course) {
    logger.error(`Course with id: ${project.course} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Course not found');
  }

  // Check authorization
  if (user.role === 'student') {
    // Students can only see projects if they're enrolled in the course
    const student = await User.findById(user.userId);
    if (
      !student ||
      !student.enrolledCourses.some(
        (enrolledCourse) =>
          enrolledCourse.toString() === project.course.toString()
      )
    ) {
      logger.error(
        `Student with id: ${user.userId} is not enrolled in course: ${project.course}`,
        {
          label: 'ProjectService',
        }
      );
      throw new APIError(403, 'You are not enrolled in this course');
    }
  } else if (user.role === 'trainer') {
    // Trainers can only see projects for their own courses
    if (course.trainer.toString() !== user.userId) {
      logger.error(
        `Trainer with id: ${user.userId} is not authorized to view this project`,
        {
          label: 'ProjectService',
        }
      );
      throw new APIError(403, 'You are not authorized to view this project');
    }
  }
  // Admin and super-admin can see all projects

  return project;
}

export async function updateProjectService(params, body, user) {
  const { projectId } = params;
  const {
    title,
    description,
    assignedTo,
    status,
    githubLink,
    submissionUrl,
    marks,
    feedback,
  } = body;

  const existingProject = await getProjectByIdRepo(projectId);
  if (!existingProject) {
    logger.error(`Project with id: ${projectId} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Project not found');
  }

  // Verify course exists
  const course = await getCourseById(existingProject.course.toString());
  if (!course) {
    logger.error(`Course with id: ${existingProject.course} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Course not found');
  }

  // Check if trainer owns the course
  if (user.role === 'trainer' && course.trainer.toString() !== user.userId) {
    logger.error(
      `Trainer with id: ${user.userId} is not authorized to update this project`,
      {
        label: 'ProjectService',
      }
    );
    throw new APIError(403, 'You are not authorized to update this project');
  }

  const project = await updateProjectRepo(projectId, {
    title,
    description,
    assignedTo,
    status,
    githubLink,
    submissionUrl,
    marks,
    feedback,
  });

  return project;
}

export async function deleteProjectService(params, user) {
  const { projectId } = params;

  const existingProject = await getProjectByIdRepo(projectId);
  if (!existingProject) {
    logger.error(`Project with id: ${projectId} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Project not found');
  }

  // Verify course exists
  const course = await getCourseById(existingProject.course.toString());
  if (!course) {
    logger.error(`Course with id: ${existingProject.course} not found`, {
      label: 'ProjectService',
    });
    throw new APIError(404, 'Course not found');
  }

  // Check if trainer owns the course
  if (user.role === 'trainer' && course.trainer.toString() !== user.userId) {
    logger.error(
      `Trainer with id: ${user.userId} is not authorized to delete this project`,
      {
        label: 'ProjectService',
      }
    );
    throw new APIError(403, 'You are not authorized to delete this project');
  }

  await deleteProjectRepo(projectId);
}
