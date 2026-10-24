const express = require('express');
const router = express.Router();
const { getPlanner, updateGoal } = require('../controllers/plannerController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getPlanner);
router.put('/goal', protect, updateGoal);

module.exports = router;
