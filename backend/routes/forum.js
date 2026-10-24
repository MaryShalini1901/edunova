const express = require('express');
const router = express.Router();
const { getComments, createComment, likeComment, replyComment } = require('../controllers/forumController');
const { protect } = require('../middleware/auth');

router.get('/', getComments);
router.post('/', protect, createComment);
router.post('/:id/like', protect, likeComment);
router.post('/:id/reply', protect, replyComment);

module.exports = router;
