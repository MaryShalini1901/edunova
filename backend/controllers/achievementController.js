const Achievement = require('../models/Achievement');
const User = require('../models/User');

// @desc    Get User Achievements
// @route   GET /api/achievements
// @access  Private
const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({ user: req.user._id })
      .sort({ earnedAt: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Leaderboard
// @route   GET /api/achievements/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('name xp level avatar streak')
      .sort({ xp: -1 })
      .limit(50);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Achievement
// @route   POST /api/achievements
// @access  Private
const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create({
      user: req.user._id,
      ...req.body
    });

    // Add XP to user
    const user = await User.findById(req.user._id);
    user.xp += achievement.xpReward;
    user.coins += achievement.coinReward;
    await user.save();

    res.status(201).json(achievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAchievements, getLeaderboard, createAchievement };
