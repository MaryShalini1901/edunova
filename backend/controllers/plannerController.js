const User = require('../models/User');

// @desc    Get Planner Data
// @route   GET /api/planner
// @access  Private
const getPlanner = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses');
    
    res.json({
      enrolledCourses: user.enrolledCourses,
      streak: user.streak,
      lastActive: user.lastActive
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Daily Goal
// @route   PUT /api/planner/goal
// @access  Private
const updateGoal = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.dailyGoal = req.body.dailyGoal;
      await user.save();
      res.json({ message: 'Goal updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlanner, updateGoal };
