const WebsiteSettings = require('../models/WebsiteSettings');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// GET /api/settings (Public)
const getSettings = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      let settings = await WebsiteSettings.findOne();
      if (!settings) {
        settings = await WebsiteSettings.create(mockStore.settings);
      }
      return res.status(200).json({ success: true, data: settings });
    }
    return res.status(200).json({ success: true, data: mockStore.settings });
  } catch (error) {
    next(error);
  }
};

// PUT /api/settings (Admin protected)
const updateSettings = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      let settings = await WebsiteSettings.findOne();
      if (!settings) {
        settings = await WebsiteSettings.create(req.body);
      } else {
        Object.assign(settings, req.body);
        await settings.save();
      }
      return res.status(200).json({ success: true, data: settings });
    }

    mockStore.settings = { ...mockStore.settings, ...req.body };
    return res.status(200).json({ success: true, data: mockStore.settings });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings
};
