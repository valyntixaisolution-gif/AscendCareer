import Project from '../models/project.model.js';

export async function createProject(projectData) {
  const project = new Project(projectData);
  await project.save();
  return project;
}

export async function getProjectsByCourse(courseId) {
  const projects = await Project.find({ course: courseId })
    .populate('course', 'title')
    .populate('assignedTo', 'name email');
  return projects;
}

export async function getProjectById(projectId) {
  const project = await Project.findById(projectId)
    .populate('course', 'title')
    .populate('assignedTo', 'name email');
  return project;
}

export async function updateProject(projectId, updateData) {
  const project = await Project.findByIdAndUpdate(projectId, updateData, {
    new: true,
    runValidators: true,
  })
    .populate('course', 'title')
    .populate('assignedTo', 'name email');
  return project;
}

export async function deleteProject(projectId) {
  await Project.findByIdAndDelete(projectId);
}
