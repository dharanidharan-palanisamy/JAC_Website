const FAQ = require('../models/FAQ');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// GET /api/faqs
const getFAQs = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
      return res.status(200).json({ success: true, count: faqs.length, data: faqs });
    }
    return res.status(200).json({ success: true, count: mockStore.faqs.length, data: mockStore.faqs });
  } catch (error) {
    next(error);
  }
};

// GET /api/faqs/admin
const getAllFAQsAdmin = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const faqs = await FAQ.find().sort({ order: 1 });
      return res.status(200).json({ success: true, count: faqs.length, data: faqs });
    }
    return res.status(200).json({ success: true, count: mockStore.faqs.length, data: mockStore.faqs });
  } catch (error) {
    next(error);
  }
};

// POST /api/faqs
const createFAQ = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const faq = await FAQ.create(req.body);
      return res.status(201).json({ success: true, data: faq });
    }
    const faq = { _id: `faq-${Date.now()}`, ...req.body, createdAt: new Date() };
    mockStore.faqs.push(faq);
    return res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

// PUT /api/faqs/:id
const updateFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'FAQ not found' });
      return res.status(200).json({ success: true, data: updated });
    }
    const idx = mockStore.faqs.findIndex(f => f._id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });
    mockStore.faqs[idx] = { ...mockStore.faqs[idx], ...req.body };
    return res.status(200).json({ success: true, data: mockStore.faqs[idx] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/faqs/:id
const deleteFAQ = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await FAQ.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'FAQ not found' });
      return res.status(200).json({ success: true, message: 'FAQ deleted' });
    }
    const idx = mockStore.faqs.findIndex(f => f._id === id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'FAQ not found' });
    mockStore.faqs.splice(idx, 1);
    return res.status(200).json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ
};
