const express = require('express');
const router = express.Router();
const logoController = require('../controllers/logoController');
const { protect } = require('../middleware/auth');

// Public route for public client site
router.get('/', logoController.getLogos);

// Protected routes for admin console
router.get('/admin/all', protect, logoController.getAllLogosAdmin);
router.post('/', protect, logoController.createLogo);
router.put('/:id', protect, logoController.updateLogo);
router.delete('/:id', protect, logoController.deleteLogo);

module.exports = router;
