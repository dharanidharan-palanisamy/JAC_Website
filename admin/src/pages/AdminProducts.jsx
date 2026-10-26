import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Layers,
  ExternalLink,
  Zap,
  BarChart3,
  Database,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';
import ImageUploadDropzone from '../components/ImageUploadDropzone';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    tagline: '',
    category: 'Enterprise SaaS',
    badge: 'Flagship Platform',
    description: '',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    features: 'Multi-entity accounting and automated tax compliance\nReal-time inventory sync across multiple warehouses\nRole-based granular access control & SOC2 compliant audit logs',
    statMetric: '99.99%',
    statLabel: 'Uptime Reliability',
    order: 1,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getAllProductsAdmin();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      ...initialForm,
      order: products.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      slug: prod.slug || '',
      tagline: prod.tagline || '',
      category: prod.category || 'Enterprise SaaS',
      badge: prod.badge || '',
      description: prod.description || '',
      icon: prod.icon || 'Layers',
      image: prod.image || '',
      features: (prod.features || []).join('\n'),
      statMetric: prod.stats?.metric || '99.9%',
      statLabel: prod.stats?.label || 'Uptime',
      order: prod.order || 1,
      isActive: prod.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        tagline: formData.tagline,
        category: formData.category,
        badge: formData.badge,
        description: formData.description,
        icon: formData.icon,
        image: formData.image,
        features: formData.features.split('\n').map((f) => f.trim()).filter(Boolean),
        stats: {
          metric: formData.statMetric,
          label: formData.statLabel
        },
        order: Number(formData.order) || 1,
        isActive: formData.isActive
      };

      if (editingProduct) {
        const res = await api.updateProduct(editingProduct._id, payload);
        if (res.success) {
          fetchProducts();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createProduct(payload);
        if (res.success) {
          fetchProducts();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        setProducts(products.filter((p) => p._id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              Client Products Page (/products)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Proprietary Products Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Create, update, and manage proprietary enterprise platforms shown on the client Products page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5173/products"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Public Page</span>
          </a>

          <button
            onClick={openCreateModal}
            className="py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Product List */}
      {loading ? (
        <div className="py-20 text-center text-neutral-600 text-sm">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
          <Layers className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-neutral-950 mb-1">No products found</h3>
          <p className="text-neutral-600 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
            Get started by adding your first proprietary software product.
          </p>
          <button
            onClick={openCreateModal}
            className="py-2 px-4 rounded-xl bg-black text-white font-bold text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-900 font-bold">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                        {prod.name}
                        {prod.isActive === false && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Inactive
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-neutral-600 block">{prod.category}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-900 border border-amber-400/20 font-semibold">
                    {prod.badge}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 font-medium mb-2">
                  "{prod.tagline}"
                </p>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {prod.description}
                </p>

                {/* Features Snippet */}
                {prod.features && prod.features.length > 0 && (
                  <div className="mb-4 space-y-1.5 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                      Key Highlights:
                    </span>
                    {prod.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                    {prod.features.length > 2 && (
                      <span className="text-[10px] text-neutral-500 block pt-1">
                        + {prod.features.length - 2} more features
                      </span>
                    )}
                  </div>
                )}

                {/* Stat Badge */}
                {prod.stats?.metric && (
                  <div className="flex items-center gap-2 text-xs text-neutral-700 mb-4 bg-neutral-100 px-3 py-1.5 rounded-lg w-fit border border-neutral-300">
                    <span className="font-bold text-neutral-900">{prod.stats.metric}</span>
                    <span className="text-neutral-600">{prod.stats.label}</span>
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-neutral-600">Order: #{prod.order || 1}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(prod)}
                    className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {deleteConfirmId === prod._id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-neutral-950 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="py-1.5 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(prod._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingProduct ? 'Edit Product Details' : 'Add New Proprietary Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. JAC Nexus ERP"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Enterprise SaaS / FinTech"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Intelligent Enterprise Resource Planning"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Flagship Platform / AI Enabled"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the platform value proposition, target use-cases, and architecture capabilities..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Product Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Multi-entity accounting&#10;Real-time inventory synchronization&#10;Role-based granular access control"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Metric Highlight (e.g. 42% or 99.99%)
                  </label>
                  <input
                    type="text"
                    value={formData.statMetric}
                    onChange={(e) => setFormData({ ...formData, statMetric: e.target.value })}
                    placeholder="e.g. 42%"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Metric Label
                  </label>
                  <input
                    type="text"
                    value={formData.statLabel}
                    onChange={(e) => setFormData({ ...formData, statLabel: e.target.value })}
                    placeholder="e.g. Efficiency Improvement"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <ImageUploadDropzone
                label="Featured Product Screenshot / Image"
                value={formData.image}
                onChange={(newImg) => setFormData({ ...formData, image: newImg })}
                hint="Drag & drop product dashboard screenshot or feature graphic"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="isActiveProduct"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-950 focus:ring-black bg-neutral-100 border-neutral-300"
                  />
                  <label htmlFor="isActiveProduct" className="text-sm font-medium text-neutral-800">
                    Active on Public Website
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
