const mockStore = require('../utils/mockStore');

// GET /api/content/:pageKey
const getPageContent = async (req, res, next) => {
  try {
    const { pageKey } = req.params;
    let data = null;
    if (pageKey === 'home') data = mockStore.homeContent;
    else if (pageKey === 'about') data = mockStore.aboutContent;
    else if (pageKey === 'legal') data = mockStore.legalContent;
    else if (pageKey === 'process') {
      data = {
        processSteps: mockStore.processSteps,
        engineeringStandards: mockStore.engineeringStandards
      };
    } else if (pageKey === 'industries') {
      data = mockStore.industries;
    }

    if (!data) {
      return res.status(404).json({ success: false, message: `Content for ${pageKey} not found` });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// PUT /api/content/:pageKey
const updatePageContent = async (req, res, next) => {
  try {
    const { pageKey } = req.params;
    if (pageKey === 'home') {
      mockStore.homeContent = { ...mockStore.homeContent, ...req.body };
      return res.status(200).json({ success: true, data: mockStore.homeContent });
    } else if (pageKey === 'about') {
      mockStore.aboutContent = { ...mockStore.aboutContent, ...req.body };
      return res.status(200).json({ success: true, data: mockStore.aboutContent });
    } else if (pageKey === 'legal') {
      mockStore.legalContent = { ...mockStore.legalContent, ...req.body };
      return res.status(200).json({ success: true, data: mockStore.legalContent });
    }

    return res.status(400).json({ success: false, message: `Invalid pageKey: ${pageKey}` });
  } catch (error) {
    next(error);
  }
};

// Industries CRUD
const getIndustries = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.industries.length, data: mockStore.industries });
  } catch (error) {
    next(error);
  }
};

const createIndustry = async (req, res, next) => {
  try {
    const newInd = {
      _id: `ind-${Date.now()}`,
      isActive: true,
      order: mockStore.industries.length + 1,
      ...req.body
    };
    mockStore.industries.push(newInd);
    return res.status(201).json({ success: true, data: newInd });
  } catch (error) {
    next(error);
  }
};

const updateIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.industries.findIndex(i => i._id === id || i.title === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Industry not found' });
    }
    mockStore.industries[index] = { ...mockStore.industries[index], ...req.body };
    return res.status(200).json({ success: true, data: mockStore.industries[index] });
  } catch (error) {
    next(error);
  }
};

const deleteIndustry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.industries.findIndex(i => i._id === id || i.title === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Industry not found' });
    }
    mockStore.industries.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Industry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Process Steps CRUD
const getProcessSteps = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        steps: mockStore.processSteps,
        standards: mockStore.engineeringStandards
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateProcessStep = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.processSteps.findIndex(s => s._id === id || s.step === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Process step not found' });
    }
    mockStore.processSteps[index] = { ...mockStore.processSteps[index], ...req.body };
    return res.status(200).json({ success: true, data: mockStore.processSteps[index] });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPageContent,
  updatePageContent,
  getIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  getProcessSteps,
  updateProcessStep
};
