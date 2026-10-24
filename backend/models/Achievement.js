const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  icon: {
    type: String,
    default: '🏆'
  },
  type: {
    type: String,
    enum: ['streak', 'course', 'quiz', 'xp', 'special'],
    default: 'special'
  },
  xpReward: {
    type: Number,
    default: 0
  },
  coinReward: {
    type: Number,
    default: 0
  },
  earnedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', achievementSchema);
