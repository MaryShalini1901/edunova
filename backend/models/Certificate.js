const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate unique certificate number
certificateSchema.pre('save', async function(next) {
  if (!this.certificateNumber) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    this.certificateNumber = `EDU-${timestamp}-${random}`.toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
