const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
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
    default: ''
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    explanation: {
      type: String,
      default: ''
    }
  }],
  duration: {
    type: Number,
    default: 0
  },
  passingScore: {
    type: Number,
    default: 70
  },
  attempts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Quiz', quizSchema);
