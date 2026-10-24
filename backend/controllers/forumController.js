const Comment = require('../models/Comment');

// @desc    Get All Comments
// @route   GET /api/forum
// @access  Public
const getComments = async (req, res) => {
  try {
    const { courseId } = req.query;
    let query = {};
    
    if (courseId) {
      query.course = courseId;
    }

    const comments = await Comment.find(query)
      .populate('user', 'name avatar')
      .populate('replies.user', 'name avatar')
      .sort({ isPinned: -1, createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Comment
// @route   POST /api/forum
// @access  Private
const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      user: req.user._id,
      ...req.body
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like Comment
// @route   POST /api/forum/:id/like
// @access  Private
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      const alreadyLiked = comment.likes.includes(req.user._id);
      
      if (alreadyLiked) {
        comment.likes = comment.likes.filter(id => id.toString() !== req.user._id.toString());
      } else {
        comment.likes.push(req.user._id);
      }

      await comment.save();
      res.json({ liked: !alreadyLiked, likes: comment.likes.length });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reply to Comment
// @route   POST /api/forum/:id/reply
// @access  Private
const replyComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (comment) {
      comment.replies.push({
        user: req.user._id,
        content: req.body.content
      });

      await comment.save();
      
      const updatedComment = await Comment.findById(comment._id)
        .populate('user', 'name avatar')
        .populate('replies.user', 'name avatar');

      res.json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getComments, createComment, likeComment, replyComment };
