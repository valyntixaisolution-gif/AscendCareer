import {
  createAssignment as createAssignmentRepo,
  getAssignmentsByCourse as getAssignmentsByCourseRepo,
  getAssignmentById as getAssignmentByIdRepo,
  updateAssignment as updateAssignmentRepo,
  deleteAssignment as deleteAssignmentRepo,
  submitAssignment as submitAssignmentRepo,
  gradeAssignment as gradeAssignmentRepo,
} from '../repositories/assignment.repository.js';

export async function createAssignmentService(params, body) {
  const { courseId } = params;
  const { title, description, dueDate, maxMarks } = body;

  const assignment = await createAssignmentRepo({
    title,
    description,
    course: courseId,
    dueDate,
    maxMarks,
  });

  return assignment;
}

export async function getAssignmentsByCourseService(params) {
  const { courseId } = params;

  const assignments = await getAssignmentsByCourseRepo(courseId);

  return assignments;
}

export async function getAssignmentByIdService(params) {
  const { assignmentId } = params;

  const assignment = await getAssignmentByIdRepo(assignmentId);

  return assignment;
}

export async function updateAssignmentService(params, body) {
  const { assignmentId } = params;
  const { title, description, dueDate, maxMarks } = body;

  const assignment = await updateAssignmentRepo(assignmentId, {
    title,
    description,
    dueDate,
    maxMarks,
  });

  return assignment;
}

export async function deleteAssignmentService(params) {
  const { assignmentId } = params;

  await deleteAssignmentRepo(assignmentId);
}

export async function submitAssignmentService(params, body, user) {
  const { assignmentId } = params;
  const { submissionUrl } = body;

  const submission = await submitAssignmentRepo(assignmentId, {
    student: user._id,
    submissionUrl,
    submittedAt: new Date(),
  });

  return submission;
}

export async function gradeAssignmentService(params, body) {
  const { assignmentId } = params;
  const { studentId, marksObtained, feedback } = body;

  const submission = await gradeAssignmentRepo(assignmentId, studentId, {
    marksObtained,
    feedback,
  });

  return submission;
}
