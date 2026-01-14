import Internship from '../models/internship.model.js';

export async function createInternship(internshipData) {
  const internship = new Internship(internshipData);
  await internship.save();
  return internship;
}

export async function getAllInternships() {
  const internships = await Internship.find()
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email');
  return internships;
}

export async function getInternshipById(internshipId) {
  const internship = await Internship.findById(internshipId)
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email');
  return internship;
}

export async function updateInternship(internshipId, updateData) {
  const internship = await Internship.findByIdAndUpdate(
    internshipId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email');
  return internship;
}

export async function deleteInternship(internshipId) {
  await Internship.findByIdAndDelete(internshipId);
}

export async function applyForInternship(internshipId, userId) {
  const internship = await Internship.findByIdAndUpdate(
    internshipId,
    { $addToSet: { applicants: userId } },
    { new: true }
  )
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email');
  return internship;
}

export async function getApplicants(internshipId) {
  const internship = await Internship.findById(internshipId)
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email role');
  return internship;
}

export async function withdrawApplication(internshipId, userId) {
  const internship = await Internship.findByIdAndUpdate(
    internshipId,
    { $pull: { applicants: userId } },
    { new: true }
  )
    .populate('createdBy', 'fullName email')
    .populate('applicants', 'fullName email');
  return internship;
}
