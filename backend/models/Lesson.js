const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  resources: [{
    title: String,
    url: String
  }],
  notes: {
    type: String,
    default: ''
  },
  isFree: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lesson', lessonSchema);
