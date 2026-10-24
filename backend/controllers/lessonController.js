const Lesson = require('../models/Lesson');

// @desc    Get All Lessons
// @route   GET /api/lessons
// @access  Public
const getLessons = async (req, res) => {
  try {
    const { courseId } = req.query;
    let query = {};
    
    if (courseId) {
      query.course = courseId;
    }

    const lessons = await Lesson.find(query).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Lesson by ID
// @route   GET /api/lessons/:id
// @access  Public
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (lesson) {
      res.json(lesson);
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Lesson
// @route   POST /api/lessons
// @access  Private/Admin
const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Lesson
// @route   PUT /api/lessons/:id
// @access  Private/Admin
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (lesson) {
      Object.assign(lesson, req.body);
      const updatedLesson = await lesson.save();
      res.json(updatedLesson);
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Lesson
// @route   DELETE /api/lessons/:id
// @access  Private/Admin
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (lesson) {
      await lesson.deleteOne();
      res.json({ message: 'Lesson removed' });
    } else {
      res.status(404).json({ message: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLessons, getLessonById, createLesson, updateLesson, deleteLesson };
