const express = require('express');
const router = express.Router();
const {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} = require('../controllers/lessonController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getLessons);
router.get('/:id', getLessonById);
router.post('/', protect, admin, createLesson);
router.put('/:id', protect, admin, updateLesson);
router.delete('/:id', protect, admin, deleteLesson);

module.exports = router;
