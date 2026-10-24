const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);
router.post('/:id/enroll', protect, enrollCourse);

module.exports = router;
