const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  tagline: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Code'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  deliverables: [{
    type: String
  }],
  features: [{
    title: String,
    description: String
  }],
  faq: [{
    question: String,
    answer: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
