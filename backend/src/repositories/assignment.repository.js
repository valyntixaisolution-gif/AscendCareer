import Assignment from '../models/assignment.model.js';

export async function createAssignment(assignmentData) {
  const assignment = new Assignment(assignmentData);
  await assignment.save();
  return assignment;
}

export async function getAssignmentsByCourse(courseId) {
  const assignments = await Assignment.find({ course: courseId });
  return assignments;
}

export async function getAssignmentById(assignmentId) {
  const assignment = await Assignment.findById(assignmentId);
  return assignment;
}

export async function updateAssignment(assignmentId, updateData) {
  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    updateData,
    { new: true, runValidators: true }
  );
  return assignment;
}

export async function deleteAssignment(assignmentId) {
  await Assignment.findByIdAndDelete(assignmentId);
}

export async function submitAssignment(assignmentId, submissionData) {
  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    { $push: { submissions: submissionData } },
    { new: true }
  );
  return assignment;
}

export async function gradeAssignment(assignmentId, studentId, gradeData) {
  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    {
      $set: {
        'submissions.$[elem].marksObtained': gradeData.marksObtained,
        'submissions.$[elem].feedback': gradeData.feedback,
      },
    },
    {
      arrayFilters: [{ 'elem.student': studentId }],
      new: true,
    }
  );
  return assignment;
}
