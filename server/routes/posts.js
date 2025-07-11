// posts.js - Post routes

const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
  getMyPosts,
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const { validatePost, validateComment } = require('../utils/validation');

// Public routes
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);

// Protected routes
router.get('/my-posts', protect, getMyPosts);
router.post('/', protect, uploadSingle, validatePost, createPost);
router.put('/:id', protect, uploadSingle, validatePost, updatePost);
router.delete('/:id', protect, deletePost);

// Comment routes
router.post('/:id/comments', protect, validateComment, addComment);

module.exports = router; 