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
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
  createEngineeringStandard,
  updateEngineeringStandard,
  deleteEngineeringStandard
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
router.post('/process/step', protect, createProcessStep);
router.put('/process/step/:id', protect, updateProcessStep);
router.delete('/process/step/:id', protect, deleteProcessStep);

// Engineering standards
router.post('/process/standard', protect, createEngineeringStandard);
router.put('/process/standard/:id', protect, updateEngineeringStandard);
router.delete('/process/standard/:id', protect, deleteEngineeringStandard);

module.exports = router;
