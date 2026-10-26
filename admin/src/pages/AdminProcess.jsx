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
  Plus
} from 'lucide-react';
import { api } from '../services/api';

const AdminProcess = () => {
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'standards'
  const [steps, setSteps] = useState([]);
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Step modal
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [stepForm, setStepForm] = useState({
    step: '01',
    title: '',
    summary: '',
    details: ''
  });
  const [savingStep, setSavingStep] = useState(false);

  // Standard modal
  const [isStdModalOpen, setIsStdModalOpen] = useState(false);
  const [editingStdIndex, setEditingStdIndex] = useState(null);
  const [stdForm, setStdForm] = useState({
    title: '',
    desc: '',
    icon: 'Zap'
  });

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

  const openEditStepModal = (s) => {
    setEditingStep(s);
    setStepForm({
      step: s.step || '01',
      title: s.title || '',
      summary: s.summary || '',
      details: (s.details || []).join('\n')
    });
    setIsStepModalOpen(true);
  };

  const handleStepSubmit = async (e) => {
    e.preventDefault();
    setSavingStep(true);
    try {
      const payload = {
        title: stepForm.title,
        summary: stepForm.summary,
        details: stepForm.details.split('\n').map((d) => d.trim()).filter(Boolean)
      };

      const res = await api.updateProcessStep(editingStep._id, payload);
      if (res.success) {
        loadData();
        setIsStepModalOpen(false);
      }
    } catch (err) {
      console.error('Error updating process step:', err);
    } finally {
      setSavingStep(false);
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
            Manage the 5-step agile engineering delivery framework and enterprise code quality standards.
          </p>
        </div>

        <a
          href="http://localhost:5173/process"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Eye className="w-4 h-4" />
          <span>View Public Page</span>
        </a>
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
          5-Step Agile Framework ({steps.length})
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

      {/* TAB 1: 5-STEP AGILE FRAMEWORK */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading steps...
            </div>
          ) : (
            steps.map((st) => (
              <div
                key={st._id}
                className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-5 sm:p-6 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-bold text-neutral-900 bg-neutral-100 border border-neutral-300 px-3 py-1.5 rounded-xl">
                      {st.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-950">{st.title}</h3>
                      <p className="text-xs text-neutral-600">{st.summary}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => openEditStepModal(st)}
                    className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-auto"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                  </button>
                </div>

                <div className="bg-neutral-50/40 p-4 rounded-xl border border-neutral-200">
                  <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-2">
                    Key Deliverables & Action Items:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-neutral-700">
                    {(st.details || []).map((det, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-950">{std.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {std.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Standard #{idx + 1}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Enforced
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT STEP MODAL */}
      {isStepModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                Edit Delivery Phase {stepForm.step}
              </h2>
              <button
                onClick={() => setIsStepModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStepSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Step Title *</label>
                <input
                  type="text"
                  required
                  value={stepForm.title}
                  onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Executive Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={stepForm.summary}
                  onChange={(e) => setStepForm({ ...stepForm, summary: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Action Items & Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={stepForm.details}
                  onChange={(e) => setStepForm({ ...stepForm, details: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsStepModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingStep}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50"
                >
                  {savingStep ? 'Saving...' : 'Update Phase Details'}
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
