const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Admin protected
router.get('/admin/all', protect, getAllServicesAdmin);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
