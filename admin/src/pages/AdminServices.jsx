import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Code2 } from 'lucide-react';
import { api } from '../services/api';
import ImageUploadDropzone from '../components/ImageUploadDropzone';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
    tags: 'React, Next.js, Node.js',
    deliverables: 'Custom Web Design, API Integrations, Cloud Deployment',
    order: 1,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.getAllServicesAdmin();
      if (res.success) {
        setServices(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      tagline: service.tagline || '',
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      featuredImage: service.featuredImage || '',
      tags: (service.tags || []).join(', '),
      deliverables: (service.deliverables || []).join(', '),
      order: service.order || 0,
      isActive: service.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        deliverables: formData.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
      };

      if (editingService) {
        const res = await api.updateService(editingService._id, payload);
        if (res.success) {
          fetchServices();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createService(payload);
        if (res.success) {
          fetchServices();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await api.deleteService(id);
      if (res.success) {
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (service) => {
    try {
      const res = await api.updateService(service._id, { isActive: !service.isActive });
      if (res.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === service._id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold block mb-1">
            Service Catalog
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-sans-tight">
            Services Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Create, modify, and publish services displayed on the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-neutral-600 text-sm">
            Loading service offerings...
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service._id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neutral-500">Slug: /{service.slug}</span>
                  <button
                    onClick={() => toggleActive(service)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      service.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <h3 className="text-xl font-bold text-neutral-950 mb-2">{service.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-3 mb-4 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1 mb-6">
                  {(service.tags || []).slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-neutral-50 text-neutral-600 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <span className="text-xs text-neutral-500 font-mono">Order: {service.order}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <h3 className="text-xl font-bold text-neutral-950">
                {editingService ? `Edit Service: ${editingService.title}` : 'Create New Service'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI & Automation Engineering"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Short compelling subtitle"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Short Description *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise card summary..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Full Detailed Description *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Detailed breakdown of architecture, process, and value..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <ImageUploadDropzone
                label="Featured Service Image"
                value={formData.featuredImage}
                onChange={(newImg) => setFormData({ ...formData, featuredImage: newImg })}
                hint="Drag & drop service header image, or enter URL"
              />

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, Next.js, Node.js, GraphQL"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Deliverables (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="Custom UI Design, REST API, Cloud DevOps"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-700">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-950 bg-neutral-50 border-neutral-200"
                  />
                  <span>Active & Visible on Public Site</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
