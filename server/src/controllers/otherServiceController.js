const mockStore = require('../utils/mockStore');

// GET /api/other-services
const getOtherServices = async (req, res, next) => {
  try {
    const active = mockStore.otherServices.filter(s => s.isActive !== false);
    return res.status(200).json({ success: true, count: active.length, data: active });
  } catch (error) {
    next(error);
  }
};

// GET /api/other-services/admin/all
const getAllOtherServicesAdmin = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.otherServices.length, data: mockStore.otherServices });
  } catch (error) {
    next(error);
  }
};

// GET /api/other-services/:id
const getOtherServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = mockStore.otherServices.find(s => s._id === id || s.slug === id || s.id === id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// POST /api/other-services
const createOtherService = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const newService = {
      _id: `os-${Date.now()}`,
      isActive: true,
      deliverables: [],
      techStack: [],
      order: mockStore.otherServices.length + 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.otherServices.push(newService);
    return res.status(201).json({ success: true, data: newService });
  } catch (error) {
    next(error);
  }
};

// PUT /api/other-services/:id
const updateOtherService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.otherServices.findIndex(s => s._id === id || s.slug === id || s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    mockStore.otherServices[index] = {
      ...mockStore.otherServices[index],
      ...req.body,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.otherServices[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/other-services/:id
const deleteOtherService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.otherServices.findIndex(s => s._id === id || s.slug === id || s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    mockStore.otherServices.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOtherServices,
  getAllOtherServicesAdmin,
  getOtherServiceById,
  createOtherService,
  updateOtherService,
  deleteOtherService
};
