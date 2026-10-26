const { logos } = require('../utils/mockStore');

// GET /api/logos - Public active logos sorted by order
exports.getLogos = async (req, res) => {
  try {
    const activeLogos = logos
      .filter((l) => l.isActive !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return res.status(200).json({
      success: true,
      count: activeLogos.length,
      data: activeLogos
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/logos/admin/all - Admin: All logos
exports.getAllLogosAdmin = async (req, res) => {
  try {
    const all = [...logos].sort((a, b) => (a.order || 0) - (b.order || 0));
    return res.status(200).json({
      success: true,
      count: all.length,
      data: all
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/logos - Admin: Add new logo
exports.createLogo = async (req, res) => {
  try {
    const { name, src, order, isActive } = req.body;
    if (!name || !src) {
      return res.status(400).json({ success: false, message: 'Name and src are required' });
    }

    const newLogo = {
      id: `logo-${Date.now()}`,
      name,
      src,
      order: order !== undefined ? Number(order) : logos.length + 1,
      isActive: isActive !== undefined ? Boolean(isActive) : true
    };

    logos.push(newLogo);

    return res.status(201).json({
      success: true,
      message: 'Logo added successfully',
      data: newLogo
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/logos/:id - Admin: Update logo
exports.updateLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, src, order, isActive } = req.body;

    const logo = logos.find((l) => l.id === id || l._id === id);
    if (!logo) {
      return res.status(404).json({ success: false, message: 'Logo not found' });
    }

    if (name !== undefined) logo.name = name;
    if (src !== undefined) logo.src = src;
    if (order !== undefined) logo.order = Number(order);
    if (isActive !== undefined) logo.isActive = Boolean(isActive);

    return res.status(200).json({
      success: true,
      message: 'Logo updated successfully',
      data: logo
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/logos/:id - Admin: Delete logo
exports.deleteLogo = async (req, res) => {
  try {
    const { id } = req.params;
    const index = logos.findIndex((l) => l.id === id || l._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Logo not found' });
    }

    const deleted = logos.splice(index, 1);
    return res.status(200).json({
      success: true,
      message: 'Logo deleted successfully',
      data: deleted[0]
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
