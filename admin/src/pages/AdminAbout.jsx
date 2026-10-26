import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  Sparkles,
  Shield,
  Code,
  Save,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import ImageUploadDropzone from '../components/ImageUploadDropzone';

const AdminAbout = () => {
  const [activeTab, setActiveTab] = useState('team'); // 'team' | 'values' | 'story'
  const [teamMembers, setTeamMembers] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [savingTeam, setSavingTeam] = useState(false);
  const [deleteConfirmTeamId, setDeleteConfirmTeamId] = useState(null);

  // About Content State
  const [aboutContent, setAboutContent] = useState({
    heroEyebrow: 'About JAC MediaLand',
    heroHeading: 'We exist to help ambitious brands',
    heroHeadingItalic: 'dominate the digital world.',
    heroDescription: 'Founded with a vision to merge cutting-edge software engineering with award-winning creative design...',
    missionHeading: 'Our Core Mission',
    missionText: 'To democratize world-class software craft...',
    visionHeading: 'Our Vision',
    visionText: 'To be the most trusted technology engineering partner...'
  });
  const [savingContent, setSavingContent] = useState(false);
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  // Core Values
  const [coreValues, setCoreValues] = useState([]);
  const [isValModalOpen, setIsValModalOpen] = useState(false);
  const [editingVal, setEditingVal] = useState(null);

  const initialTeamForm = {
    name: '',
    role: '',
    expertise: '',
    bio: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    order: 1,
    isActive: true
  };

  const [teamForm, setTeamForm] = useState(initialTeamForm);

  const initialValForm = {
    title: '',
    description: '',
    icon: 'Sparkles'
  };
  const [valForm, setValForm] = useState(initialValForm);

  const loadData = async () => {
    setLoadingTeam(true);
    try {
      const [teamRes, contentRes] = await Promise.all([
        api.getAllTeamAdmin(),
        api.getPageContent('about')
      ]);

      if (teamRes.success) setTeamMembers(teamRes.data);
      if (contentRes.success) {
        setAboutContent(contentRes.data);
        if (contentRes.data.coreValues) {
          setCoreValues(contentRes.data.coreValues);
        }
      }
    } catch (err) {
      console.error('Error loading about data:', err);
    } finally {
      setLoadingTeam(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Team CRUD
  const openCreateTeamModal = () => {
    setEditingMember(null);
    setTeamForm({
      ...initialTeamForm,
      order: teamMembers.length + 1
    });
    setIsTeamModalOpen(true);
  };

  const openEditTeamModal = (m) => {
    setEditingMember(m);
    setTeamForm({
      name: m.name || '',
      role: m.role || '',
      expertise: m.expertise || '',
      bio: m.bio || '',
      image: m.image || '',
      order: m.order || 1,
      isActive: m.isActive !== false
    });
    setIsTeamModalOpen(true);
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setSavingTeam(true);
    try {
      const payload = {
        ...teamForm,
        order: Number(teamForm.order) || 1
      };

      if (editingMember) {
        const res = await api.updateTeamMember(editingMember._id, payload);
        if (res.success) {
          loadData();
          setIsTeamModalOpen(false);
        }
      } else {
        const res = await api.createTeamMember(payload);
        if (res.success) {
          loadData();
          setIsTeamModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving team member:', err);
    } finally {
      setSavingTeam(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      const res = await api.deleteTeamMember(id);
      if (res.success) {
        setTeamMembers(teamMembers.filter((m) => m._id !== id));
        setDeleteConfirmTeamId(null);
      }
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  // Values CRUD
  const handleSaveValues = async (newValues) => {
    try {
      const updated = {
        ...aboutContent,
        coreValues: newValues
      };
      const res = await api.updatePageContent('about', updated);
      if (res.success) {
        setCoreValues(newValues);
        setAboutContent(updated);
        setIsValModalOpen(false);
      }
    } catch (err) {
      console.error('Error updating values:', err);
    }
  };

  const handleValSubmit = (e) => {
    e.preventDefault();
    let updated;
    if (editingVal !== null) {
      updated = [...coreValues];
      updated[editingVal] = valForm;
    } else {
      updated = [...coreValues, valForm];
    }
    handleSaveValues(updated);
  };

  const handleDeleteVal = (idx) => {
    const updated = coreValues.filter((_, i) => i !== idx);
    handleSaveValues(updated);
  };

  // Content Save
  const handleSaveContent = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    try {
      const res = await api.updatePageContent('about', {
        ...aboutContent,
        coreValues
      });
      if (res.success) {
        setContentSavedMsg(true);
        setTimeout(() => setContentSavedMsg(false), 3000);
      }
    } catch (err) {
      console.error('Error saving content:', err);
    } finally {
      setSavingContent(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Client About Page (/about)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            About Us & Leadership Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage executive leadership, core engineering values, and company mission details.
          </p>
        </div>

        <a
          href="http://localhost:5173/about"
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
          onClick={() => setActiveTab('team')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'team'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Leadership & Team ({teamMembers.length})
        </button>

        <button
          onClick={() => setActiveTab('values')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'values'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Core Values ({coreValues.length})
        </button>

        <button
          onClick={() => setActiveTab('story')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'story'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Company Story & Mission
        </button>
      </div>

      {/* TAB 1: TEAM MEMBERS */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-950">Leadership Team Members</h2>
            <button
              onClick={openCreateTeamModal}
              className="py-2 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>

          {loadingTeam ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading team members...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((m) => (
                <div
                  key={m._id}
                  className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-14 h-14 rounded-full object-cover border border-neutral-300"
                      />
                      <div className="overflow-hidden">
                        <h3 className="text-base font-bold text-neutral-950 truncate flex items-center gap-1.5">
                          {m.name}
                          {m.isActive === false && (
                            <span className="text-[10px] text-rose-400 font-normal">
                              (Hidden)
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-neutral-900 font-medium truncate">{m.role}</p>
                        <p className="text-[11px] text-neutral-600 truncate">{m.expertise}</p>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500">
                      Order: #{m.order || 1}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openEditTeamModal(m)}
                        className="py-1 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>

                      {deleteConfirmTeamId === m._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteTeam(m._id)}
                            className="py-1 px-2 rounded-lg bg-rose-600 text-neutral-950 text-xs font-bold"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmTeamId(null)}
                            className="py-1 px-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmTeamId(m._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CORE VALUES */}
      {activeTab === 'values' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-950">Company Core Values</h2>
            <button
              onClick={() => {
                setEditingVal(null);
                setValForm(initialValForm);
                setIsValModalOpen(true);
              }}
              className="py-2 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Core Value
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-950">{val.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingVal(idx);
                      setValForm(val);
                      setIsValModalOpen(true);
                    }}
                    className="py-1 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVal(idx)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STORY & MISSION */}
      {activeTab === 'story' && (
        <form onSubmit={handleSaveContent} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">About Page Narrative Content</h2>
              <p className="text-neutral-600 text-xs">Edit the headline, story description, mission and vision.</p>
            </div>
            {contentSavedMsg && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <Check className="w-3.5 h-3.5" /> Saved successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Eyebrow</label>
              <input
                type="text"
                value={aboutContent.heroEyebrow || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, heroEyebrow: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Heading (Regular)</label>
              <input
                type="text"
                value={aboutContent.heroHeading || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, heroHeading: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Heading (Italic Accent)</label>
            <input
              type="text"
              value={aboutContent.heroHeadingItalic || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, heroHeadingItalic: e.target.value })}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Narrative Description</label>
            <textarea
              rows={3}
              value={aboutContent.heroDescription || ''}
              onChange={(e) => setAboutContent({ ...aboutContent, heroDescription: e.target.value })}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Mission Heading</label>
              <input
                type="text"
                value={aboutContent.missionHeading || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, missionHeading: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black mb-3"
              />
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Mission Description</label>
              <textarea
                rows={3}
                value={aboutContent.missionText || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, missionText: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Vision Heading</label>
              <input
                type="text"
                value={aboutContent.visionHeading || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, visionHeading: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black mb-3"
              />
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Vision Description</label>
              <textarea
                rows={3}
                value={aboutContent.visionText || ''}
                onChange={(e) => setAboutContent({ ...aboutContent, visionText: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={savingContent}
              className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingContent ? 'Saving...' : 'Save Narrative Details'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TEAM MEMBER MODAL */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingMember ? 'Edit Leadership Member' : 'Add Leadership Member'}
              </h2>
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTeamSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  placeholder="e.g. Anand Jayaraj"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Job Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    placeholder="e.g. Founder & Managing Director"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Technical Expertise</label>
                  <input
                    type="text"
                    value={teamForm.expertise}
                    onChange={(e) => setTeamForm({ ...teamForm, expertise: e.target.value })}
                    placeholder="e.g. Full-Stack Systems & Cloud DevOps"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Short Professional Bio *</label>
                <textarea
                  required
                  rows={3}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Summary of experience, background, and responsibilities..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <ImageUploadDropzone
                label="Profile Photo Image"
                value={teamForm.image}
                onChange={(newImg) => setTeamForm({ ...teamForm, image: newImg })}
                hint="Drag & drop square headshot photo, or enter URL"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Order</label>
                  <input
                    type="number"
                    value={teamForm.order}
                    onChange={(e) => setTeamForm({ ...teamForm, order: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="isActiveMember"
                    checked={teamForm.isActive}
                    onChange={(e) => setTeamForm({ ...teamForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-950 bg-neutral-100 border-neutral-300"
                  />
                  <label htmlFor="isActiveMember" className="text-sm font-medium text-neutral-800">
                    Visible on Website
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingTeam}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50"
                >
                  {savingTeam ? 'Saving...' : editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CORE VALUE MODAL */}
      {isValModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingVal !== null ? 'Edit Core Value' : 'Add New Core Value'}
              </h2>
              <button
                onClick={() => setIsValModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleValSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Value Title *</label>
                <input
                  type="text"
                  required
                  value={valForm.title}
                  onChange={(e) => setValForm({ ...valForm, title: e.target.value })}
                  placeholder="e.g. Zero Compromise on Craft"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={valForm.description}
                  onChange={(e) => setValForm({ ...valForm, description: e.target.value })}
                  placeholder="Explain what this value means in practice..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsValModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold"
                >
                  Save Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAbout;
