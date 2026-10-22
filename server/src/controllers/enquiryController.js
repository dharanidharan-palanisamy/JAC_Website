const ContactEnquiry = require('../models/ContactEnquiry');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// POST /api/enquiries (Public submission)
const createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields'
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const enquiryData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      service: service || 'General Inquiry',
      budget: budget || 'Flexible',
      message: message.trim(),
      status: 'New',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || ''
    };

    if (getDBStatus()) {
      const enquiry = await ContactEnquiry.create(enquiryData);
      return res.status(201).json({
        success: true,
        message: 'Thank you for contacting JAC MediaLand! We have received your inquiry and our team will get in touch shortly.',
        data: enquiry
      });
    }

    const enquiry = {
      _id: `enq-${Date.now()}`,
      ...enquiryData,
      internalNotes: [],
      createdAt: new Date()
    };
    mockStore.enquiries.unshift(enquiry);

    return res.status(201).json({
      success: true,
      message: 'Thank you for contacting JAC MediaLand! We have received your inquiry and our team will get in touch shortly.',
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/enquiries (Admin: search, filter, paginate)
const getEnquiries = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (getDBStatus()) {
      const query = {};
      if (status && status !== 'All') {
        query.status = status;
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { service: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } }
        ];
      }

      const total = await ContactEnquiry.countDocuments(query);
      const enquiries = await ContactEnquiry.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.status(200).json({
        success: true,
        count: enquiries.length,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum),
        data: enquiries
      });
    }

    let list = [...mockStore.enquiries];
    if (status && status !== 'All') {
      list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.service.toLowerCase().includes(q) ||
        e.message.toLowerCase().includes(q)
      );
    }

    const total = list.length;
    const paginated = list.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return res.status(200).json({
      success: true,
      count: paginated.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: paginated
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/enquiries/:id
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note, author } = req.body;

    if (getDBStatus()) {
      const updateData = {};
      if (status) updateData.status = status;

      const enquiry = await ContactEnquiry.findById(id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }

      if (status) enquiry.status = status;
      if (note) {
        enquiry.internalNotes.push({
          text: note,
          createdAt: new Date(),
          author: author || 'Admin'
        });
      }

      await enquiry.save();
      return res.status(200).json({ success: true, data: enquiry });
    }

    const item = mockStore.enquiries.find(e => e._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    if (status) item.status = status;
    if (note) {
      item.internalNotes.push({
        text: note,
        createdAt: new Date(),
        author: author || 'Admin'
      });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/enquiries/:id
const deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await ContactEnquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
    }

    const index = mockStore.enquiries.findIndex(e => e._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    mockStore.enquiries.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
