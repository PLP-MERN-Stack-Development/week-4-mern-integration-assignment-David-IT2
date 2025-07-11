// categories.js - Category routes

const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getPostsByCategory,
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const { validateCategory } = require('../utils/validation');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.get('/:id/posts', getPostsByCategory);

// Admin routes
router.post('/', protect, authorize('admin'), validateCategory, createCategory);
router.put('/:id', protect, authorize('admin'), validateCategory, updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router; 