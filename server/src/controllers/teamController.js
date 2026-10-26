const mockStore = require('../utils/mockStore');

// GET /api/team
const getTeam = async (req, res, next) => {
  try {
    const active = mockStore.teamMembers.filter(m => m.isActive !== false);
    return res.status(200).json({ success: true, count: active.length, data: active });
  } catch (error) {
    next(error);
  }
};

// GET /api/team/admin/all
const getAllTeamAdmin = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.teamMembers.length, data: mockStore.teamMembers });
  } catch (error) {
    next(error);
  }
};

// POST /api/team
const createTeamMember = async (req, res, next) => {
  try {
    const memberData = req.body;
    const newMember = {
      _id: `team-${Date.now()}`,
      isActive: true,
      order: mockStore.teamMembers.length + 1,
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.teamMembers.push(newMember);
    return res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    next(error);
  }
};

// PUT /api/team/:id
const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.teamMembers.findIndex(m => m._id === id || m.name === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    mockStore.teamMembers[index] = {
      ...mockStore.teamMembers[index],
      ...req.body,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.teamMembers[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/team/:id
const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.teamMembers.findIndex(m => m._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    mockStore.teamMembers.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeam,
  getAllTeamAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
