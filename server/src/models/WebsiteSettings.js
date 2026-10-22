const mongoose = require('mongoose');

const WebsiteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'JAC MediaLand IT Solutions'
  },
  tagline: {
    type: String,
    default: 'Innovating Digital Possibilities, Engineering Enterprise Growth'
  },
  heroHeading: {
    type: String,
    default: 'Transforming Ideas into Iconic Digital Experiences'
  },
  heroSubheading: {
    type: String,
    default: 'Leading IT Solutions, Web & Mobile Engineering, and Creative Digital Agency delivering human-centered software and high-impact digital products.'
  },
  contactEmail: {
    type: String,
    default: 'contact@jacmedialand.com'
  },
  supportEmail: {
    type: String,
    default: 'info@jacmedialand.com'
  },
  phoneNumber: {
    type: String,
    default: '+91 98765 43210'
  },
  address: {
    type: String,
    default: 'Tech Park Avenue, IT Corridor, Coimbatore & Chennai, India'
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com/company/jacmedialand' },
    instagram: { type: String, default: 'https://instagram.com/jacmedialand' },
    twitter: { type: String, default: 'https://twitter.com/jacmedialand' },
    facebook: { type: String, default: 'https://facebook.com/jacmedialand' },
    github: { type: String, default: 'https://github.com/jacmedialand' }
  },
  stats: {
    projectsCompleted: { type: String, default: '150+' },
    happyClients: { type: String, default: '98%' },
    yearsExperience: { type: String, default: '8+' },
    expertDevelopers: { type: String, default: '25+' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.WebsiteSettings || mongoose.model('WebsiteSettings', WebsiteSettingsSchema);
