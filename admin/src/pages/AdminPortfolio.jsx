import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Star, Eye, X } from 'lucide-react';
import { api } from '../services/api';

const categories = ['Web Development', 'App Development', 'UI/UX Design', 'Digital Marketing', 'Branding', 'SEO'];

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    title: '',
    slug: '',
    client: 'Confidential Client',
    category: 'Web Development',
    summary: '',
    challenge: '',
    solution: '',
    year: '2025',
    liveUrl: 'https://jacmedialand.com',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    techStack: 'React, Node.js, Tailwind CSS, PostgreSQL',
    results: '99.99%: Uptime, <50ms: Latency',
    isFeatured: true,
    isPublished: true,
    order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.getAllProjectsAdmin();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      client: proj.client || '',
      category: proj.category || 'Web Development',
      summary: proj.summary || '',
      challenge: proj.challenge || '',
      solution: proj.solution || '',
      year: proj.year || '2025',
      liveUrl: proj.liveUrl || '',
      image: proj.image || '',
      techStack: (proj.techStack || []).join(', '),
      results: (proj.results || []).map((r) => `${r.metric}: ${r.label}`).join(', '),
      isFeatured: !!proj.isFeatured,
      isPublished: proj.isPublished !== false,
      order: proj.order || 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const parsedResults = formData.results
        .split(',')
        .map((pair) => {
          const parts = pair.split(':');
          if (parts.length >= 2) {
            return { metric: parts[0].trim(), label: parts.slice(1).join(':').trim() };
          }
          return null;
        })
        .filter(Boolean);

      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
        results: parsedResults
      };

      if (editingProject) {
        const res = await api.updateProject(editingProject._id, payload);
        if (res.success) {
          fetchProjects();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createProject(payload);
        if (res.success) {
          fetchProjects();
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
    if (!window.confirm('Are you sure you want to delete this case study?')) return;
    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (proj) => {
    try {
      const res = await api.updateProject(proj._id, { isFeatured: !proj.isFeatured });
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === proj._id ? { ...p, isFeatured: !p.isFeatured } : p))
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
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
            Case Studies
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans-tight">
            Portfolio Management
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Showcase client success stories, challenges, solutions, and measurable metric outcomes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-neutral-400 text-sm">
            Loading case studies archive...
          </div>
        ) : (
          projects.map((proj) => (
            <div
              key={proj._id}
              className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col justify-between shadow-md"
            >
              <div className="relative aspect-[16/10] bg-neutral-950">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {proj.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleFeatured(proj)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                    proj.isFeatured
                      ? 'bg-amber-400 text-black'
                      : 'bg-black/60 text-neutral-400 hover:text-white'
                  }`}
                  title={proj.isFeatured ? 'Featured on Home' : 'Click to feature on Home'}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="p-6 grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    Client: {proj.client} • {proj.year}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <span className="text-xs font-mono text-neutral-500">Slug: /{proj.slug}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Project Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? `Edit Case Study: ${editingProject.title}` : 'Create New Case Study'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. AuraPay FinTech Wallet"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. AuraPay Global"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-neutral-300 font-semibold block mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2025"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Executive Summary *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="High-level overview of the product..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">The Challenge</label>
                <textarea
                  rows="3"
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="Key technical and design friction points..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">The Solution</label>
                <textarea
                  rows="3"
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How JAC MediaLand designed & built the architecture..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Metric Results (Format: Metric: Label, Metric: Label)</label>
                <input
                  type="text"
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  placeholder="99.99%: Uptime, 250K+: Active Users, 3.4x: Retention"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, Next.js, Node.js, Stripe, Tailwind"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-400 bg-neutral-950 border-neutral-800"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-400 bg-neutral-950 border-neutral-800"
                  />
                  <span>Published & Live</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
