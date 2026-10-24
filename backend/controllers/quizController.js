const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const User = require('../models/User');

// @desc    Get All Quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('course').populate('lesson');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course');
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit Quiz
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    const { answers } = req.body;

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let correctCount = 0;
    const detailedAnswers = answers.map((answer, index) => {
      const isCorrect = answer === quiz.questions[index].correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: index,
        selectedAnswer: answer,
        isCorrect
      };
    });

    const score = (correctCount / quiz.questions.length) * 100;
    const passed = score >= quiz.passingScore;

    const result = await Result.create({
      user: req.user._id,
      quiz: quiz._id,
      course: quiz.course,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      passed,
      answers: detailedAnswers,
      timeTaken: req.body.timeTaken || 0
    });

    // Update user XP
    if (passed) {
      const user = await User.findById(req.user._id);
      user.xp += Math.round(score);
      
      // Level up every 1000 XP
      const newLevel = Math.floor(user.xp / 1000) + 1;
      if (newLevel > user.level) {
        user.level = newLevel;
      }
      
      await user.save();
    }

    res.json({
      score,
      correctAnswers: correctCount,
      totalQuestions: quiz.questions.length,
      passed,
      result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuizzes, getQuizById, submitQuiz, createQuiz };
