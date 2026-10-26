const mockStore = require('../utils/mockStore');

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const activeProducts = mockStore.products.filter(p => p.isActive !== false);
    return res.status(200).json({ success: true, count: activeProducts.length, data: activeProducts });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/admin/all
const getAllProductsAdmin = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, count: mockStore.products.length, data: mockStore.products });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = mockStore.products.find(p => p._id === id || p.slug === id || p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;
    if (!productData.slug && productData.name) {
      productData.slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    const newProduct = {
      _id: `prod-${Date.now()}`,
      isActive: true,
      features: [],
      order: mockStore.products.length + 1,
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockStore.products.push(newProduct);
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.products.findIndex(p => p._id === id || p.slug === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    mockStore.products[index] = {
      ...mockStore.products[index],
      ...req.body,
      updatedAt: new Date()
    };
    return res.status(200).json({ success: true, data: mockStore.products[index] });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = mockStore.products.findIndex(p => p._id === id || p.slug === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    mockStore.products.splice(index, 1);
    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
