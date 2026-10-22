const Service = require('../models/Service');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// GET /api/services
const getServices = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
      return res.status(200).json({ success: true, count: services.length, data: services });
    }
    return res.status(200).json({ success: true, count: mockStore.services.length, data: mockStore.services });
  } catch (error) {
    next(error);
  }
};

// GET /api/services/admin (all services including inactive)
const getAllServicesAdmin = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const services = await Service.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: services.length, data: services });
    }
    return res.status(200).json({ success: true, count: mockStore.services.length, data: mockStore.services });
  } catch (error) {
    next(error);
  }
};

// GET /api/services/:slugOrId
const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (getDBStatus()) {
      const service = await Service.findOne({
        $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
      });
      if (!service) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.status(200).json({ success: true, data: service });
    }

    const service = mockStore.services.find(s => s.slug === slug || s._id === slug);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    return res.status(200).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// POST /api/services
const createService = async (req, res, next) => {
  try {
    const serviceData = req.body;
    if (!serviceData.slug && serviceData.title) {
      serviceData.slug = serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (getDBStatus()) {
      const newService = await Service.create(serviceData);
      return res.status(201).json({ success: true, data: newService });
    }

    const newService = {
      _id: `srv-${Date.now()}`,
      ...serviceData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.services.push(newService);
    return res.status(201).json({ success: true, data: newService });
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = mockStore.services.findIndex(s => s._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    mockStore.services[index] = { ...mockStore.services[index], ...req.body, updatedAt: new Date() };
    return res.status(200).json({ success: true, data: mockStore.services[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id
const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Service.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
      return res.status(200).json({ success: true, message: 'Service deleted successfully' });
    }

    const index = mockStore.services.findIndex(s => s._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    mockStore.services.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
};
