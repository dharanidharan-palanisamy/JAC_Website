const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Project = require('../models/Project');
const ContactEnquiry = require('../models/ContactEnquiry');
const FAQ = require('../models/FAQ');
const WebsiteSettings = require('../models/WebsiteSettings');
const mockStore = require('./mockStore');

dotenv.config({ path: __dirname + '/../../.env' });

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jac_medialand';
    console.log(`Connecting to ${mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });
    console.log('MongoDB connected successfully for seeding.');

    // 1. Seed Admin
    await Admin.deleteMany({});
    await Admin.create({
      name: 'JAC MediaLand Administrator',
      email: process.env.ADMIN_INITIAL_EMAIL || 'admin@jacmedialand.com',
      password: process.env.ADMIN_INITIAL_PASSWORD || 'Admin@JAC2026!',
      role: 'superadmin'
    });
    console.log('Admin account created: admin@jacmedialand.com');

    // 2. Seed Services
    await Service.deleteMany({});
    const cleanServices = mockStore.services.map(({ _id, ...rest }) => rest);
    await Service.insertMany(cleanServices);
    console.log(`Seeded ${cleanServices.length} services`);

    // 3. Seed Projects
    await Project.deleteMany({});
    const cleanProjects = mockStore.projects.map(({ _id, ...rest }) => rest);
    await Project.insertMany(cleanProjects);
    console.log(`Seeded ${cleanProjects.length} projects`);

    // 4. Seed Enquiries
    await ContactEnquiry.deleteMany({});
    const cleanEnquiries = mockStore.enquiries.map(({ _id, ...rest }) => rest);
    await ContactEnquiry.insertMany(cleanEnquiries);
    console.log(`Seeded ${cleanEnquiries.length} contact enquiries`);

    // 5. Seed FAQs
    await FAQ.deleteMany({});
    const cleanFaqs = mockStore.faqs.map(({ _id, ...rest }) => rest);
    await FAQ.insertMany(cleanFaqs);
    console.log(`Seeded ${cleanFaqs.length} FAQs`);

    // 6. Seed Settings
    await WebsiteSettings.deleteMany({});
    await WebsiteSettings.create(mockStore.settings);
    console.log('Seeded Website Settings');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
