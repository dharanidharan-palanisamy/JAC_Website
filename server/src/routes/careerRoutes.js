const express = require('express');
const router = express.Router();
const {
  getCareers,
  getAllCareersAdmin,
  createJob,
  updateJob,
  deleteJob,
  getPerks,
  createPerk,
  updatePerk,
  deletePerk
} = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getCareers);
router.get('/perks', getPerks);

// Admin protected - Jobs
router.get('/admin/all', protect, getAllCareersAdmin);
router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

// Admin protected - Perks
router.post('/perks', protect, createPerk);
router.put('/perks/:id', protect, updatePerk);
router.delete('/perks/:id', protect, deletePerk);

module.exports = router;
