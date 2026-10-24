const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, submitQuiz, createQuiz } = require('../controllers/quizController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getQuizzes);
router.get('/:id', getQuizById);
router.post('/:id/submit', protect, submitQuiz);
router.post('/', protect, admin, createQuiz);

module.exports = router;
