const Project = require('../models/Project');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// GET /api/projects
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    if (getDBStatus()) {
      const query = { isPublished: true };
      if (category && category !== 'All') {
        query.category = category;
      }
      if (featured === 'true') {
        query.isFeatured = true;
      }
      const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    let result = mockStore.projects.filter(p => p.isPublished);
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      result = result.filter(p => p.isFeatured);
    }
    return res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/admin
const getAllProjectsAdmin = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const projects = await Project.find().sort({ order: 1, createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }
    return res.status(200).json({ success: true, count: mockStore.projects.length, data: mockStore.projects });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:slug
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (getDBStatus()) {
      const project = await Project.findOne({
        $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
      });
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, data: project });
    }

    const project = mockStore.projects.find(p => p.slug === slug || p._id === slug);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    if (!projectData.slug && projectData.title) {
      projectData.slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (getDBStatus()) {
      const newProject = await Project.create(projectData);
      return res.status(201).json({ success: true, data: newProject });
    }

    const newProject = {
      _id: `proj-${Date.now()}`,
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.projects.push(newProject);
    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const index = mockStore.projects.findIndex(p => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    mockStore.projects[index] = { ...mockStore.projects[index], ...req.body, updatedAt: new Date() };
    return res.status(200).json({ success: true, data: mockStore.projects[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    }

    const index = mockStore.projects.findIndex(p => p._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    mockStore.projects.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getAllProjectsAdmin,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject
};
