const Service = require('../models/Service');
const Project = require('../models/Project');
const ContactEnquiry = require('../models/ContactEnquiry');
const { getDBStatus } = require('../config/db');
const mockStore = require('../utils/mockStore');

// GET /api/stats (Admin Dashboard Summary)
const getDashboardStats = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      const [totalServices, totalProjects, totalEnquiries, newEnquiries] = await Promise.all([
        Service.countDocuments(),
        Project.countDocuments(),
        ContactEnquiry.countDocuments(),
        ContactEnquiry.countDocuments({ status: 'New' })
      ]);

      const recentEnquiries = await ContactEnquiry.find()
        .sort({ createdAt: -1 })
        .limit(5);

      const serviceCounts = await ContactEnquiry.aggregate([
        { $group: { _id: '$service', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          totalServices,
          totalProjects,
          totalEnquiries,
          newEnquiries,
          recentEnquiries,
          serviceCounts
        }
      });
    }

    const totalServices = mockStore.services.length;
    const totalProjects = mockStore.projects.length;
    const totalEnquiries = mockStore.enquiries.length;
    const newEnquiries = mockStore.enquiries.filter(e => e.status === 'New').length;
    const recentEnquiries = mockStore.enquiries.slice(0, 5);

    const serviceCountsMap = {};
    mockStore.enquiries.forEach(e => {
      serviceCountsMap[e.service] = (serviceCountsMap[e.service] || 0) + 1;
    });
    const serviceCounts = Object.entries(serviceCountsMap).map(([_id, count]) => ({ _id, count }));

    return res.status(200).json({
      success: true,
      data: {
        totalServices,
        totalProjects,
        totalEnquiries,
        newEnquiries,
        recentEnquiries,
        serviceCounts
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats
};
