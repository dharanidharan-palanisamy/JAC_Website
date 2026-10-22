const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET || 'jac_medialand_super_secure_jwt_secret_key_2026_modern',
    { expiresIn: '7d' }
  );
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const isDB = getDBStatus();

    if (isDB) {
      let admin = await Admin.findOne({ email: email.toLowerCase() });

      // Auto-bootstrap default admin if none exists
      if (!admin && email.toLowerCase() === (process.env.ADMIN_INITIAL_EMAIL || 'admin@jacmedialand.com').toLowerCase()) {
        admin = await Admin.create({
          name: 'JAC MediaLand Administrator',
          email: process.env.ADMIN_INITIAL_EMAIL || 'admin@jacmedialand.com',
          password: process.env.ADMIN_INITIAL_PASSWORD || 'Admin@JAC2026!',
          role: 'superadmin'
        });
      }

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      admin.lastLogin = new Date();
      await admin.save();

      const token = generateToken(admin._id, admin.email, admin.role);

      return res.status(200).json({
        success: true,
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      });
    } else {
      // In-memory fallback
      const defaultEmail = (process.env.ADMIN_INITIAL_EMAIL || 'admin@jacmedialand.com').toLowerCase();
      const defaultPass = process.env.ADMIN_INITIAL_PASSWORD || 'Admin@JAC2026!';

      if (email.toLowerCase() === defaultEmail && password === defaultPass) {
        const token = generateToken(mockStore.adminUser.id, mockStore.adminUser.email, mockStore.adminUser.role);
        return res.status(200).json({
          success: true,
          token,
          admin: {
            id: mockStore.adminUser.id,
            name: mockStore.adminUser.name,
            email: mockStore.adminUser.email,
            role: mockStore.adminUser.role
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Use admin@jacmedialand.com / Admin@JAC2026!'
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe
};
