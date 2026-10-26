const mockStore = require('../utils/mockStore');

// GET /api/programs
const getPrograms = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.programs.length, data: mockStore.programs });
  } catch (error) {
    next(error);
  }
};

// GET /api/programs/:id
const getProgramById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = mockStore.programs.find(p => p._id === id || p.slug === id || p.id === id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    return res.status(200).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// POST /api/programs
const createProgram = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const newProgram = {
      _id: `prog-${Date.now()}`,
      isActive: true,
      highlights: [],
      curriculum: [],
      deliverables: [],
      faqs: [],
      order: mockStore.programs.length + 1,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.programs.push(newProgram);
    return res.status(201).json({ success: true, data: newProgram });
  } catch (error) {
    next(error);
  }
};

// PUT /api/programs/:id
const updateProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.programs.findIndex(p => p._id === id || p.slug === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    mockStore.programs[index] = {
      ...mockStore.programs[index],
      ...req.body,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.programs[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/programs/:id
const deleteProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.programs.findIndex(p => p._id === id || p.slug === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    mockStore.programs.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Program deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram
};
