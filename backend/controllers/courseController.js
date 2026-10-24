const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// @desc    Get All Courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const courses = await Course.find(query)
      .populate('lessons')
      .sort({ createdAt: -1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('lessons')
      .populate('enrolledCourses');

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      Object.assign(course, req.body);
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      await course.deleteOne();
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Enroll in Course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const Course = require('../models/Course');
    const User = require('../models/User');
    
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (course && user) {
      if (!user.enrolledCourses.includes(course._id)) {
        user.enrolledCourses.push(course._id);
        course.enrolledCount += 1;
        await user.save();
        await course.save();
      }
      res.json({ message: 'Enrolled successfully' });
    } else {
      res.status(404).json({ message: 'Course or user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse
};
