const express = require('express');
const router = express.Router();
const {
  getProducts,
  getAllProductsAdmin,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin protected
router.get('/admin/all', protect, getAllProductsAdmin);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
