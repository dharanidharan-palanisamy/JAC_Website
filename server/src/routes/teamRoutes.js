const express = require('express');
const router = express.Router();
const {
  getTeam,
  getAllTeamAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getTeam);

// Admin protected
router.get('/admin/all', protect, getAllTeamAdmin);
router.post('/', protect, createTeamMember);
router.put('/:id', protect, updateTeamMember);
router.delete('/:id', protect, deleteTeamMember);

module.exports = router;
