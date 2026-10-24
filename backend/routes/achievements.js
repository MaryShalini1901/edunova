const express = require('express');
const router = express.Router();
const { getAchievements, getLeaderboard, createAchievement } = require('../controllers/achievementController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAchievements);
router.get('/leaderboard', getLeaderboard);
router.post('/', protect, createAchievement);

module.exports = router;
