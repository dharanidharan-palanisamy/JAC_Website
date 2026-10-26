import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Users
} from 'lucide-react';
import { api } from '../services/api';

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const initialForm = {
    title: '',
    slug: '',
    tag: 'ENTERPRISE & STARTUPS',
    badge: 'Co-Innovation Lab',
    subtitle: '',
    summary: '',
    duration: '12 – 24 Weeks',
    format: 'Hybrid / Dedicated Engineering Pods',
    commitment: 'Full-time / Sprint-based',
    targetAudience: 'High-Growth Startups & Enterprise Labs',
    location: 'Bangalore & Chennai Tech Labs / Remote Hybrid',
    overview: '',
    highlights: 'Rapid prototype-to-production sprint cycles\nDirect architecture advisory with senior CTOs\nFull CI/CD, AWS/GCP cloud setup',
    deliverables: 'Complete production-ready codebase with full IP ownership\nFully automated CI/CD pipelines\n30-day post-launch warranty with on-call SLA support',
    order: 1,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const res = await api.getPrograms();
      if (res.success) {
        setPrograms(res.data);
      }
    } catch (err) {
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const openCreateModal = () => {
    setEditingProgram(null);
    setFormData({
      ...initialForm,
      order: programs.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prog) => {
    setEditingProgram(prog);
    setFormData({
      title: prog.title || '',
      slug: prog.slug || '',
      tag: prog.tag || 'ENTERPRISE & STARTUPS',
      badge: prog.badge || '',
      subtitle: prog.subtitle || '',
      summary: prog.summary || '',
      duration: prog.duration || '',
      format: prog.format || '',
      commitment: prog.commitment || '',
      targetAudience: prog.targetAudience || '',
      location: prog.location || '',
      overview: prog.overview || '',
      highlights: (prog.highlights || []).join('\n'),
      deliverables: (prog.deliverables || []).join('\n'),
      order: prog.order || 1,
      isActive: prog.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        highlights: formData.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
        deliverables: formData.deliverables.split('\n').map((d) => d.trim()).filter(Boolean),
        order: Number(formData.order) || 1
      };

      if (editingProgram) {
        const res = await api.updateProgram(editingProgram._id, payload);
        if (res.success) {
          loadPrograms();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createProgram(payload);
        if (res.success) {
          loadPrograms();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving program:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.deleteProgram(id);
      if (res.success) {
        setPrograms(programs.filter((p) => p._id !== id));
        setDeleteConfirmId(null);
      }
    } catch (err) {
      console.error('Error deleting program:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400">
              Client Programs Page (/programs/...)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Programs & Innovation Labs Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage enterprise tech incubation pods, developer cohorts, and curriculum phases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5173/programs/incubation"
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
            <span>Add New Program</span>
          </button>
        </div>
      </div>

      {/* Programs List */}
      {loading ? (
        <div className="py-20 text-center text-neutral-600 text-sm">
          Loading programs...
        </div>
      ) : programs.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-600">
          No programs found. Click Add New Program to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((prog) => (
            <div
              key={prog._id}
              className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-950 block mb-1">
                      {prog.tag}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-950">{prog.title}</h3>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-pink-400/10 text-pink-300 border border-pink-400/20 font-semibold shrink-0">
                    {prog.badge}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 font-medium mb-3">
                  "{prog.subtitle}"
                </p>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {prog.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50/40 p-3 rounded-xl border border-neutral-200 mb-4">
                  <div className="text-neutral-600">
                    <span className="block font-bold text-neutral-700">Duration:</span>
                    {prog.duration}
                  </div>
                  <div className="text-neutral-600">
                    <span className="block font-bold text-neutral-700">Format:</span>
                    {prog.format}
                  </div>
                </div>

                {prog.highlights && prog.highlights.length > 0 && (
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] uppercase font-bold text-neutral-500 block">
                      Program Highlights:
                    </span>
                    {prog.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-600">
                  Slug: /{prog.slug || prog.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(prog)}
                    className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>

                  {deleteConfirmId === prog._id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(prog._id)}
                        className="py-1.5 px-2.5 rounded-lg bg-rose-600 text-neutral-950 text-xs font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="py-1.5 px-2 rounded-lg bg-neutral-100 text-neutral-600 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(prog._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="Delete Program"
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingProgram ? 'Edit Program Details' : 'Create New Program'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Program Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Enterprise Tech Incubation & Co-Innovation Lab"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Tagline / Subtitle *</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Short description of cohort goal"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Badge Text</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Co-Innovation Lab"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 12 – 24 Weeks"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Format</label>
                  <input
                    type="text"
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    placeholder="e.g. Hybrid / Dedicated Engineering Pods"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Highlights (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Deliverables (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProgram ? 'Update Program' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrograms;
