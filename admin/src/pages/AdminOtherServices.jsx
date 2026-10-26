import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Eye,
  CheckCircle2,
  Cloud,
  Cpu,
  ShieldCheck,
  Server,
  TestTube2,
  Headphones
} from 'lucide-react';
import { api } from '../services/api';

const AdminOtherServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    category: 'Infrastructure',
    badge: '99.99% SLA',
    icon: 'Cloud',
    tagline: '',
    description: '',
    deliverables: 'Multi-cloud architecture design\nDocker containerization & Kubernetes\nAutomated CI/CD pipelines',
    techStack: 'AWS, Google Cloud, Docker, Kubernetes, Terraform',
    order: 1,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.getAllOtherServicesAdmin();
      if (res.success) {
        setServices(res.data);
      }
    } catch (err) {
      console.error('Error fetching other services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      ...initialForm,
      order: services.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      category: service.category || 'Infrastructure',
      badge: service.badge || '',
      icon: service.icon || 'Cloud',
      tagline: service.tagline || '',
      description: service.description || '',
      deliverables: (service.deliverables || []).join('\n'),
      techStack: (service.techStack || []).join(', '),
      order: service.order || 1,
      isActive: service.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: formData.category,
        badge: formData.badge,
        icon: formData.icon,
        tagline: formData.tagline,
        description: formData.description,
        deliverables: formData.deliverables.split('\n').map((d) => d.trim()).filter(Boolean),
        techStack: formData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
        order: Number(formData.order) || 1,
        isActive: formData.isActive
      };

      if (editingService) {
        const res = await api.updateOtherService(editingService._id, payload);
        if (res.success) {
          fetchServices();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createOtherService(payload);
        if (res.success) {
          fetchServices();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving other service:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteOtherService(id);
      if (res.success) {
        setServices(services.filter((s) => s._id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error('Error deleting other service:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              Client Other Services Page (/other-services)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Specialized Services Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage Cloud Architecture, AI Automation, Cybersecurity, API Modernization, QA, and SRE services.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5173/other-services"
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
            <span>Add Specialized Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 text-center text-neutral-600 text-sm">
          Loading specialized services...
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
          <Sparkles className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-neutral-950 mb-1">No services found</h3>
          <p className="text-neutral-600 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
            Get started by adding your first specialized engineering capability.
          </p>
          <button
            onClick={openCreateModal}
            className="py-2 px-4 rounded-xl bg-black text-white font-bold text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Capability
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-purple-300 font-bold">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                        {service.title}
                        {service.isActive === false && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Inactive
                          </span>
                        )}
                      </h3>
                      <span className="text-xs text-neutral-600 block">{service.category}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-400/10 text-purple-300 border border-purple-400/20 font-semibold">
                    {service.badge}
                  </span>
                </div>

                <p className="text-xs text-purple-200/90 font-medium mb-2">
                  "{service.tagline}"
                </p>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Deliverables snippet */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="mb-4 space-y-1.5 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">
                      Deliverables:
                    </span>
                    {service.deliverables.slice(0, 3).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{del}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack tags */}
                {service.techStack && service.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-300/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-neutral-600">Order: #{service.order || 1}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(service)}
                    className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  {deleteConfirmId === service._id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(service._id)}
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
                      onClick={() => setDeleteConfirmId(service._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                      title="Delete Service"
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
                {editingService ? 'Edit Specialized Service' : 'Add Specialized Capability'}
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
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Cloud Architecture & DevOps"
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
                    placeholder="e.g. Infrastructure / Next-Gen Tech"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. 99.99% SLA / AI Enabled"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="AWS, Docker, Kubernetes, Terraform"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. High-availability cloud migrations, automated CI/CD pipelines"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
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
                  placeholder="Comprehensive description of engineering capabilities, problem solving, and business benefits..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Deliverables List (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  placeholder="Multi-cloud architecture design & migration roadmap&#10;Docker containerization & Kubernetes&#10;Automated CI/CD deployment pipelines"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

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
                    id="isActiveOtherService"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-950 focus:ring-black bg-neutral-100 border-neutral-300"
                  />
                  <label htmlFor="isActiveOtherService" className="text-sm font-medium text-neutral-800">
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

export default AdminOtherServices;
