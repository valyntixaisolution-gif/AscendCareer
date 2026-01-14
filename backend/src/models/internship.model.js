import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    stipend: {
      type: Number,
    },
    description: {
      type: String,
      trim: true,
    },
    requirements: [String],
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model('Internship', internshipSchema);

export default Internship;
