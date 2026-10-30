import React, { useState, useEffect } from 'react';
import {
  Compass,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  CheckCircle2,
  Zap,
  GitBranch,
  Lock,
  Cpu,
  Plus,
  ShieldCheck,
  Sparkles,
  Layout,
  Code2,
  Rocket
} from 'lucide-react';
import { api } from '../services/api';

const AVAILABLE_STEP_ICONS = [
  { name: 'Compass', icon: Compass },
  { name: 'Layout', icon: Layout },
  { name: 'Code2', icon: Code2 },
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Rocket', icon: Rocket }
];

const AVAILABLE_STD_ICONS = [
  { name: 'Zap', icon: Zap },
  { name: 'GitBranch', icon: GitBranch },
  { name: 'Lock', icon: Lock },
  { name: 'Cpu', icon: Cpu },
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Sparkles', icon: Sparkles }
];

const stdIconMap = {
  Zap,
  GitBranch,
  Lock,
  Cpu,
  ShieldCheck,
  Sparkles
};

const AdminProcess = () => {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'standards'
  const [steps, setSteps] = useState([]);
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Step modal state
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [stepForm, setStepForm] = useState({
    step: '01',
    title: '',
    summary: '',
    icon: 'Compass',
    details: ''
  });
  const [savingStep, setSavingStep] = useState(false);

  // Standard modal state
  const [isStdModalOpen, setIsStdModalOpen] = useState(false);
  const [editingStd, setEditingStd] = useState(null);
  const [stdForm, setStdForm] = useState({
    title: '',
    desc: '',
    icon: 'Zap'
  });
  const [savingStd, setSavingStd] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.getProcessSteps();
      if (res.success && res.data) {
        setSteps(res.data.steps || []);
        setStandards(res.data.standards || []);
      }
    } catch (err) {
      console.error('Error loading process data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- STEP ACTIONS ---
  const openCreateStepModal = () => {
    setEditingStep(null);
    const nextNum = String(steps.length + 1).padStart(2, '0');
    setStepForm({
      step: nextNum,
      title: '',
      summary: '',
      icon: 'Compass',
      details: ''
    });
    setIsStepModalOpen(true);
  };

  const openEditStepModal = (s) => {
    setEditingStep(s);
    setStepForm({
      step: s.step || '01',
      title: s.title || '',
      summary: s.summary || '',
      icon: s.icon || 'Compass',
      details: (s.details || []).join('\n')
    });
    setIsStepModalOpen(true);
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    setSavingStep(true);
    try {
      const payload = {
        step: stepForm.step,
        title: stepForm.title,
        summary: stepForm.summary,
        icon: stepForm.icon,
        details: stepForm.details
          .split('\n')
          .map((d) => d.trim())
          .filter(Boolean)
      };

      if (editingStep) {
        const res = await api.updateProcessStep(editingStep._id, payload);
        if (res.success) {
          loadData();
          setIsStepModalOpen(false);
        }
      } else {
        const res = await api.createProcessStep(payload);
        if (res.success) {
          loadData();
          setIsStepModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving process step:', err);
    } finally {
      setSavingStep(false);
    }
  };

  const handleDeleteStep = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete step "${title || id}"? This will remove it from the client process and home pages.`)) {
      return;
    }
    try {
      const res = await api.deleteProcessStep(id);
      if (res.success) {
        setSteps((prev) => prev.filter((s) => s._id !== id && s.step !== id));
      }
    } catch (err) {
      console.error('Error deleting process step:', err);
    }
  };

  // --- STANDARD ACTIONS ---
  const openCreateStdModal = () => {
    setEditingStd(null);
    setStdForm({
      title: '',
      desc: '',
      icon: 'Zap'
    });
    setIsStdModalOpen(true);
  };

  const openEditStdModal = (std) => {
    setEditingStd(std);
    setStdForm({
      title: std.title || '',
      desc: std.desc || '',
      icon: std.icon || 'Zap'
    });
    setIsStdModalOpen(true);
  };

  const handleStdSubmit = async (e) => {
    e.preventDefault();
    setSavingStd(true);
    try {
      const payload = {
        title: stdForm.title,
        desc: stdForm.desc,
        icon: stdForm.icon
      };

      if (editingStd) {
        const res = await api.updateEngineeringStandard(editingStd._id, payload);
        if (res.success) {
          loadData();
          setIsStdModalOpen(false);
        }
      } else {
        const res = await api.createEngineeringStandard(payload);
        if (res.success) {
          loadData();
          setIsStdModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving engineering standard:', err);
    } finally {
      setSavingStd(false);
    }
  };

  const handleDeleteStd = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete engineering standard "${title || id}"?`)) {
      return;
    }
    try {
      const res = await api.deleteEngineeringStandard(id);
      if (res.success) {
        setStandards((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error('Error deleting engineering standard:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              Client Process Page (/process)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Engineering Process & Standards
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage the agile delivery framework steps and enterprise code quality standards with live sync.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="http://localhost:5173/process"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View Public Page</span>
          </a>

          {activeTab === 'steps' ? (
            <button
              onClick={openCreateStepModal}
              className="py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Delivery Phase</span>
            </button>
          ) : (
            <button
              onClick={openCreateStdModal}
              className="py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Code Standard</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab('steps')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'steps'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Agile Framework Steps ({steps.length})
        </button>

        <button
          onClick={() => setActiveTab('standards')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'standards'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Engineering Standards ({standards.length})
        </button>
      </div>

      {/* TAB 1: AGILE FRAMEWORK STEPS */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading steps...
            </div>
          ) : steps.length === 0 ? (
            <div className="py-16 text-center bg-white border border-neutral-200 rounded-2xl p-8">
              <Compass className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 mb-1">No process steps found</h3>
              <p className="text-xs text-neutral-500 mb-4">Click "Add Delivery Phase" above to create your first step.</p>
              <button
                onClick={openCreateStepModal}
                className="py-2 px-4 rounded-xl bg-black text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Add Delivery Phase
              </button>
            </div>
          ) : (
            steps.map((st) => (
              <div
                key={st._id || st.step}
                className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-5 sm:p-6 transition-all shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-bold text-neutral-900 bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-xl shrink-0">
                      {st.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950">{st.title}</h3>
                      <p className="text-xs text-neutral-600 mt-0.5">{st.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={() => openEditStepModal(st)}
                      className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Details
                    </button>
                    <button
                      onClick={() => handleDeleteStep(st._id || st.step, st.title)}
                      className="py-1.5 px-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Delete Step"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>

                <div className="bg-neutral-50/70 p-4 rounded-xl border border-neutral-200/80">
                  <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-2">
                    Key Deliverables & Action Items ({st.details?.length || 0}):
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-700">
                    {(st.details || []).map((det, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{det}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: STANDARDS */}
      {activeTab === 'standards' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading standards...
            </div>
          ) : standards.length === 0 ? (
            <div className="py-16 text-center bg-white border border-neutral-200 rounded-2xl p-8">
              <Zap className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-900 mb-1">No engineering standards found</h3>
              <p className="text-xs text-neutral-500 mb-4">Click "Add Code Standard" above to create your first standard.</p>
              <button
                onClick={openCreateStdModal}
                className="py-2 px-4 rounded-xl bg-black text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" /> Add Code Standard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standards.map((std, idx) => {
                const IconComp = stdIconMap[std.icon] || Zap;
                return (
                  <div
                    key={std._id || idx}
                    className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-2xs"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold shrink-0">
                            <IconComp className="w-5 h-5 text-neutral-800" />
                          </div>
                          <h3 className="text-base font-bold text-neutral-950">{std.title}</h3>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditStdModal(std)}
                            className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
                            title="Edit Standard"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStd(std._id || idx, std.title)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Standard"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
                        {std.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
                      <span>Standard #{idx + 1}</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Enforced
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD / EDIT STEP */}
      {isStepModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingStep ? `Edit Delivery Phase ${stepForm.step}` : 'Add New Delivery Phase'}
              </h2>
              <button
                onClick={() => setIsStepModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStepSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Step Number *</label>
                  <input
                    type="text"
                    required
                    value={stepForm.step}
                    onChange={(e) => setStepForm({ ...stepForm, step: e.target.value })}
                    placeholder="e.g. 01"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm font-mono focus:outline-none focus:border-black focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">Phase Title *</label>
                  <input
                    type="text"
                    required
                    value={stepForm.title}
                    onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                    placeholder="e.g. Discovery & Product Strategy"
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Executive Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={stepForm.summary}
                  onChange={(e) => setStepForm({ ...stepForm, summary: e.target.value })}
                  placeholder="Deep dive into your business model, target audiences, and technical requirements."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Key Deliverables & Action Items (One item per line)
                </label>
                <textarea
                  rows={5}
                  value={stepForm.details}
                  onChange={(e) => setStepForm({ ...stepForm, details: e.target.value })}
                  placeholder="Stakeholder interviews and requirement gathering&#10;Competitor landscape and technical feasibility analysis&#10;Information architecture and user persona creation"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-xs font-mono leading-relaxed focus:outline-none focus:border-black focus:bg-white"
                />
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Tip: Press Enter between action items. Each line renders with an active checkmark on the live website.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsStepModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStep}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {savingStep ? 'Saving...' : editingStep ? 'Update Phase Details' : 'Publish Phase Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT ENGINEERING STANDARD */}
      {isStdModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingStd ? 'Edit Engineering Standard' : 'Add Code Standard'}
              </h2>
              <button
                onClick={() => setIsStdModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStdSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Standard Title *</label>
                <input
                  type="text"
                  required
                  value={stdForm.title}
                  onChange={(e) => setStdForm({ ...stdForm, title: e.target.value })}
                  placeholder="e.g. Sub-Second Page Loads"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={stdForm.desc}
                  onChange={(e) => setStdForm({ ...stdForm, desc: e.target.value })}
                  placeholder="Every website and application is engineered to achieve 90+ Lighthouse and Core Web Vitals performance benchmarks."
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">Standard Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_STD_ICONS.map(({ name, icon: Icon }) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => setStdForm({ ...stdForm, icon: name })}
                      className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                        stdForm.icon === name
                          ? 'border-black bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsStdModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStd}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {savingStd ? 'Saving...' : editingStd ? 'Update Standard' : 'Publish Standard'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcess;
