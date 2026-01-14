import {
  createInternship as createInternshipRepo,
  getAllInternships as getAllInternshipsRepo,
  getInternshipById as getInternshipByIdRepo,
  updateInternship as updateInternshipRepo,
  deleteInternship as deleteInternshipRepo,
  applyForInternship as applyForInternshipRepo,
  getApplicants as getApplicantsRepo,
  withdrawApplication as withdrawApplicationRepo,
} from '../repositories/internship.repository.js';
import APIError from '../lib/api-error.lib.js';
import logger from '../lib/logger.lib.js';

export async function createInternshipService(body, user) {
  const {
    title,
    company,
    location,
    duration,
    stipend,
    description,
    requirements,
    status,
  } = body;

  // Only company and admin roles can create internships
  if (!['company', 'admin', 'super-admin'].includes(user.role)) {
    logger.error(
      `User with role ${user.role} is not authorized to create internships`,
      {
        label: 'InternshipService',
        userId: user.userId,
      }
    );
    throw new APIError(403, 'You are not authorized to create internships');
  }

  const internship = await createInternshipRepo({
    title,
    company,
    createdBy: user.userId,
    location,
    duration,
    stipend,
    description,
    requirements,
    status,
  });

  return internship;
}

export async function getAllInternshipsService() {
  const internships = await getAllInternshipsRepo();

  if (internships.length === 0) {
    logger.info('No internships found', {
      label: 'InternshipService',
    });
  }

  return internships;
}

export async function getInternshipByIdService(params) {
  const { internshipId } = params;

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  return internship;
}

export async function updateInternshipService(params, body, user) {
  const { internshipId } = params;
  const {
    title,
    company,
    location,
    duration,
    stipend,
    description,
    requirements,
    status,
  } = body;

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  // Check if user is the creator (company) or admin
  if (
    user.role === 'company' &&
    internship.createdBy.toString() !== user.userId
  ) {
    logger.error(
      `Company with id: ${user.userId} is not authorized to update this internship`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(403, 'You are not authorized to update this internship');
  }

  const updatedInternship = await updateInternshipRepo(internshipId, {
    title,
    company,
    location,
    duration,
    stipend,
    description,
    requirements,
    status,
  });

  return updatedInternship;
}

export async function deleteInternshipService(params, user) {
  const { internshipId } = params;

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  // Check if user is the creator (company) or admin
  if (
    user.role === 'company' &&
    internship.createdBy.toString() !== user.userId
  ) {
    logger.error(
      `Company with id: ${user.userId} is not authorized to delete this internship`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(403, 'You are not authorized to delete this internship');
  }

  await deleteInternshipRepo(internshipId);
}

export async function applyForInternshipService(params, user) {
  const { internshipId } = params;

  // Only students can apply
  if (user.role !== 'student') {
    logger.error(
      `User with role ${user.role} is not authorized to apply for internships`,
      {
        label: 'InternshipService',
        userId: user.userId,
      }
    );
    throw new APIError(403, 'Only students can apply for internships');
  }

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  // Check if internship is open
  if (internship.status === 'closed') {
    logger.warn(
      `Student ${user.userId} attempted to apply to closed internship ${internshipId}`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(400, 'This internship is closed for applications');
  }

  // Check if already applied
  if (internship.applicants.some((app) => app._id.toString() === user.userId)) {
    logger.warn(
      `Student ${user.userId} already applied to internship ${internshipId}`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(400, 'You have already applied for this internship');
  }

  const updatedInternship = await applyForInternshipRepo(
    internshipId,
    user.userId
  );

  return updatedInternship;
}

export async function getApplicantsService(params, user) {
  const { internshipId } = params;

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  // Check if user is the creator (company) or admin
  if (
    user.role === 'company' &&
    internship.createdBy.toString() !== user.userId
  ) {
    logger.error(
      `Company with id: ${user.userId} is not authorized to view applicants for this internship`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(
      403,
      'You are not authorized to view applicants for this internship'
    );
  }

  const internshipWithApplicants = await getApplicantsRepo(internshipId);

  return internshipWithApplicants;
}

export async function withdrawApplicationService(params, user) {
  const { internshipId } = params;

  // Only students can withdraw
  if (user.role !== 'student') {
    logger.error(
      `User with role ${user.role} is not authorized to withdraw applications`,
      {
        label: 'InternshipService',
        userId: user.userId,
      }
    );
    throw new APIError(403, 'Only students can withdraw applications');
  }

  const internship = await getInternshipByIdRepo(internshipId);
  if (!internship) {
    logger.error(`Internship with id: ${internshipId} not found`, {
      label: 'InternshipService',
    });
    throw new APIError(404, 'Internship not found');
  }

  // Check if already applied
  if (
    !internship.applicants.some((app) => app._id.toString() === user.userId)
  ) {
    logger.warn(
      `Student ${user.userId} has not applied to internship ${internshipId}`,
      {
        label: 'InternshipService',
      }
    );
    throw new APIError(400, 'You have not applied for this internship');
  }

  const updatedInternship = await withdrawApplicationRepo(
    internshipId,
    user.userId
  );

  return updatedInternship;
}
