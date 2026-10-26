const express = require('express');
const router = express.Router();
const {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
} = require('../controllers/programController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getPrograms);
router.get('/:id', getProgramById);

// Admin protected
router.post('/', protect, createProgram);
router.put('/:id', protect, updateProgram);
router.delete('/:id', protect, deleteProgram);

module.exports = router;
