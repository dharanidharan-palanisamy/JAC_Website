const mockStore = require('../utils/mockStore');

// GET /api/careers (Jobs)
const getCareers = async (req, res, next) => {
  try {
    const active = mockStore.careers.filter(c => c.isActive !== false);
    return res.status(200).json({ success: true, count: active.length, data: active });
  } catch (error) {
    next(error);
  }
};

// GET /api/careers/admin/all
const getAllCareersAdmin = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.careers.length, data: mockStore.careers });
  } catch (error) {
    next(error);
  }
};

// POST /api/careers
const createJob = async (req, res, next) => {
  try {
    const jobData = req.body;
    if (!jobData.slug && jobData.title) {
      jobData.slug = jobData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const newJob = {
      _id: `job-${Date.now()}`,
      isActive: true,
      responsibilities: [],
      requirements: [],
      order: mockStore.careers.length + 1,
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.careers.push(newJob);
    return res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    next(error);
  }
};

// PUT /api/careers/:id
const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.careers.findIndex(c => c._id === id || c.slug === id || c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }
    mockStore.careers[index] = {
      ...mockStore.careers[index],
      ...req.body,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.careers[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/careers/:id
const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.careers.findIndex(c => c._id === id || c.slug === id || c.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Job posting not found' });
    }
    mockStore.careers.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Job posting deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Perks CRUD
const getPerks = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.perks.length, data: mockStore.perks });
  } catch (error) {
    next(error);
  }
};

const createPerk = async (req, res, next) => {
  try {
    const newPerk = {
      _id: `perk-${Date.now()}`,
      ...req.body
    };
    mockStore.perks.push(newPerk);
    return res.status(201).json({ success: true, data: newPerk });
  } catch (error) {
    next(error);
  }
};

const updatePerk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.perks.findIndex(p => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Perk not found' });
    }
    mockStore.perks[index] = { ...mockStore.perks[index], ...req.body };
    return res.status(200).json({ success: true, data: mockStore.perks[index] });
  } catch (error) {
    next(error);
  }
};

const deletePerk = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.perks.findIndex(p => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Perk not found' });
    }
    mockStore.perks.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Perk deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/careers/apply (Public applicant submission with resume)
const submitApplication = async (req, res, next) => {
  try {
    const {
      jobId,
      jobTitle,
      department,
      name,
      email,
      phone,
      portfolio,
      resumeFileName,
      resumeFileSize,
      resumeFile,
      resumeUrl,
      coverNote
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required fields'
      });
    }

    if (!resumeFile && !resumeUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your resume by uploading a file or supplying a link'
      });
    }

    const applicationData = {
      _id: `app-${Date.now()}`,
      jobId: jobId || 'general',
      jobTitle: jobTitle || 'General Application',
      department: department || 'Engineering',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      portfolio: (portfolio || '').trim(),
      resumeFileName: resumeFileName || (resumeUrl ? 'Cloud Resume Link' : 'Resume.pdf'),
      resumeFileSize: resumeFileSize || '',
      resumeFile: resumeFile || '',
      resumeUrl: resumeUrl || '',
      coverNote: (coverNote || '').trim(),
      status: 'New',
      createdAt: new Date()
    };

    if (!mockStore.applications) {
      mockStore.applications = [];
    }
    mockStore.applications.unshift(applicationData);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your application and resume have been successfully submitted.',
      data: applicationData
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/careers/applications/admin (Admin list of applications)
const getApplicationsAdmin = async (req, res, next) => {
  try {
    const list = mockStore.applications || [];
    return res.status(200).json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/careers/applications/:id/status
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!mockStore.applications) mockStore.applications = [];
    const index = mockStore.applications.findIndex(a => a._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    mockStore.applications[index] = {
      ...mockStore.applications[index],
      status: status || mockStore.applications[index].status,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.applications[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/careers/applications/:id
const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mockStore.applications) mockStore.applications = [];
    const index = mockStore.applications.findIndex(a => a._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    mockStore.applications.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCareers,
  getAllCareersAdmin,
  createJob,
  updateJob,
  deleteJob,
  getPerks,
  createPerk,
  updatePerk,
  deletePerk,
  submitApplication,
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication
};

