const express = require('express');
const router = express.Router();
const {
  getOtherServices,
  getAllOtherServicesAdmin,
  getOtherServiceById,
  createOtherService,
  updateOtherService,
  deleteOtherService
} = require('../controllers/otherServiceController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getOtherServices);
router.get('/:id', getOtherServiceById);

// Admin protected
router.get('/admin/all', protect, getAllOtherServicesAdmin);
router.post('/', protect, createOtherService);
router.put('/:id', protect, updateOtherService);
router.delete('/:id', protect, deleteOtherService);

module.exports = router;
