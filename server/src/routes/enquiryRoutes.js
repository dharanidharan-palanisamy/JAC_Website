const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

// Rate limiting for public contact submission
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per IP
  message: {
    success: false,
    message: 'Too many enquiry submissions from this IP, please try again after 15 minutes'
  }
});

// Public
router.post('/', enquiryLimiter, createEnquiry);

// Protected Admin
router.get('/', protect, getEnquiries);
router.patch('/:id', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
