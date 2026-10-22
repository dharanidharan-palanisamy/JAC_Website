const express = require('express');
const router = express.Router();
const {
  getProjects,
  getAllProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin protected
router.get('/admin/all', protect, getAllProjectsAdmin);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
