const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
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
  client: {
    type: String,
    default: 'Confidential Client'
  },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'App Development', 'UI/UX Design', 'Digital Marketing', 'Branding', 'SEO'],
    default: 'Web Development'
  },
  summary: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    default: ''
  },
  solution: {
    type: String,
    default: ''
  },
  results: [{
    metric: String,
    label: String
  }],
  techStack: [{
    type: String
  }],
  image: {
    type: String,
    required: true
  },
  gallery: [{
    type: String
  }],
  liveUrl: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: '2025'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
