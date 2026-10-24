const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  submissions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    fileUrl: String,
    submittedAt: {
      type: Date,
      default: Date.now
    },
    grade: Number,
    feedback: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);
