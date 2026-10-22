const mongoose = require('mongoose');

const ContactEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  service: {
    type: String,
    default: 'General Inquiry'
  },
  budget: {
    type: String,
    default: 'Flexible'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Contacted', 'Proposal Sent', 'Closed', 'Archived'],
    default: 'New'
  },
  internalNotes: [{
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: String
  }],
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.ContactEnquiry || mongoose.model('ContactEnquiry', ContactEnquirySchema);
