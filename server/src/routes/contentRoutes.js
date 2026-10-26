const express = require('express');
const router = express.Router();
const {
  getPageContent,
  updatePageContent,
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getProcessSteps,
  updateProcessStep
} = require('../controllers/contentController');
const { protect } = require('../middleware/auth');

// Public
router.get('/industries', getIndustries);
router.get('/process', getProcessSteps);
router.get('/:pageKey', getPageContent);

// Admin protected
router.put('/:pageKey', protect, updatePageContent);

// Industries
router.post('/industries', protect, createIndustry);
router.put('/industries/:id', protect, updateIndustry);
router.delete('/industries/:id', protect, deleteIndustry);

// Process steps
router.put('/process/step/:id', protect, updateProcessStep);

module.exports = router;
