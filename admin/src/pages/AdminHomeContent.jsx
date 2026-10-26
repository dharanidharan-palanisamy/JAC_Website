import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Home,
  Save,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  CheckCircle2,
  Wind,
  Layers,
  Sparkles,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import ImageUploadDropzone from '../components/ImageUploadDropzone';

const AdminHomeContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'hero';
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Home Content
  const [homeContent, setHomeContent] = useState({
    heroTagline: 'Creative Design & Full-Stack IT Solutions Agency',
    heroHeading: 'Innovating Digital Possibilities,',
    heroHeadingItalic: 'Engineering Enterprise Growth.',
    heroDescription: 'From high-performance corporate platforms and native mobile apps...',
    primaryCtaText: 'Explore Services',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Schedule Technical Consultation',
    secondaryCtaLink: '/contact',
    storySectionTitle: 'Why JAC MediaLand?',
    storySectionHeading: 'Engineering with purpose, designing with soul.',
    storySectionDescription: 'We bridge visionary design aesthetics with battle-tested software engineering...',
    storyItems: []
  });
  const [savingContent, setSavingContent] = useState(false);
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  // Industries
  const [industries, setIndustries] = useState([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [isIndModalOpen, setIsIndModalOpen] = useState(false);
  const [editingInd, setEditingInd] = useState(null);
  const [indForm, setIndForm] = useState({
    title: '',
    subtitle: 'SOLUTIONS & TECH',
    icon: 'Wind',
    order: 1,
    isActive: true
  });
  const [deleteConfirmIndId, setDeleteConfirmIndId] = useState(null);

  // Client Partner Logos
  const [logos, setLogos] = useState([]);
  const [loadingLogos, setLoadingLogos] = useState(true);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [logoForm, setLogoForm] = useState({
    name: '',
    src: '/Logos/optimized/1.png',
    order: 1,
    isActive: true
  });
  const [deleteConfirmLogoId, setDeleteConfirmLogoId] = useState(null);
  const [logoFeedback, setLogoFeedback] = useState(null);

  const showLogoFeedback = (msg, type = 'success') => {
    setLogoFeedback({ msg, type });
    setTimeout(() => setLogoFeedback(null), 3500);
  };

  const loadData = async () => {
    try {
      const [contentRes, indRes, logosRes] = await Promise.all([
        api.getPageContent('home'),
        api.getIndustries(),
        api.getAllLogosAdmin().catch(() => ({ success: false, data: [] }))
      ]);
      if (contentRes?.success) setHomeContent(contentRes.data);
      if (indRes?.success) setIndustries(indRes.data);
      if (logosRes?.success && Array.isArray(logosRes.data)) {
        setLogos(logosRes.data);
      }
    } catch (err) {
      console.error('Error loading home data:', err);
    } finally {
      setLoadingIndustries(false);
      setLoadingLogos(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        if (isLogoModalOpen) setIsLogoModalOpen(false);
        if (isIndModalOpen) setIsIndModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLogoModalOpen, isIndModalOpen]);

  const handleSaveContent = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    try {
      const res = await api.updatePageContent('home', homeContent);
      if (res.success) {
        setContentSavedMsg(true);
        setTimeout(() => setContentSavedMsg(false), 3000);
      }
    } catch (err) {
      console.error('Error updating home content:', err);
    } finally {
      setSavingContent(false);
    }
  };

  // Industries Handlers
  const openCreateIndModal = () => {
    setEditingInd(null);
    setIndForm({
      title: '',
      subtitle: 'SOLUTIONS & TECH',
      icon: 'Wind',
      order: industries.length + 1,
      isActive: true
    });
    setIsIndModalOpen(true);
  };

  const openEditIndModal = (ind) => {
    setEditingInd(ind);
    setIndForm({
      title: ind.title || '',
      subtitle: ind.subtitle || 'SOLUTIONS & TECH',
      icon: ind.icon || 'Wind',
      order: ind.order || 1,
      isActive: ind.isActive !== false
    });
    setIsIndModalOpen(true);
  };

  const handleIndSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...indForm,
        order: Number(indForm.order) || 1
      };

      if (editingInd) {
        const res = await api.updateIndustry(editingInd._id, payload);
        if (res.success) {
          loadData();
          setIsIndModalOpen(false);
        }
      } else {
        const res = await api.createIndustry(payload);
        if (res.success) {
          loadData();
          setIsIndModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving industry:', err);
    }
  };

  const handleDeleteInd = async (id) => {
    try {
      const res = await api.deleteIndustry(id);
      if (res.success) {
        setIndustries(industries.filter((i) => i._id !== id));
        setDeleteConfirmIndId(null);
      }
    } catch (err) {
      console.error('Error deleting industry:', err);
    }
  };

  // Logos Handlers
  const openCreateLogoModal = () => {
    setEditingLogo(null);
    const nextOrder = logos.length > 0 ? Math.max(...logos.map((l) => l.order || 0)) + 1 : 1;
    setLogoForm({
      name: '',
      src: '',
      order: nextOrder,
      isActive: true
    });
    setIsLogoModalOpen(true);
  };

  const openEditLogoModal = (logo) => {
    setEditingLogo(logo);
    setLogoForm({
      name: logo.name || '',
      src: logo.src || '',
      order: logo.order !== undefined ? logo.order : 1,
      isActive: logo.isActive !== false
    });
    setIsLogoModalOpen(true);
  };

  const handleLogoSubmit = async (e) => {
    e.preventDefault();
    if (!logoForm.name.trim()) {
      showLogoFeedback('Please enter a company or brand name', 'error');
      return;
    }
    if (!logoForm.src.trim()) {
      showLogoFeedback('Please provide a logo image path or URL', 'error');
      return;
    }

    try {
      const payload = {
        name: logoForm.name.trim(),
        src: logoForm.src.trim(),
        order: Number(logoForm.order) || 1,
        isActive: Boolean(logoForm.isActive)
      };

      if (editingLogo) {
        const logoId = editingLogo.id || editingLogo._id;
        const res = await api.updateLogo(logoId, payload);
        if (res.success) {
          setLogos((prev) =>
            prev
              .map((l) => (l.id === logoId || l._id === logoId ? res.data : l))
              .sort((a, b) => (a.order || 0) - (b.order || 0))
          );
          setIsLogoModalOpen(false);
          showLogoFeedback(`Updated logo "${payload.name}" successfully!`);
        } else {
          showLogoFeedback(res.message || 'Failed to update logo', 'error');
        }
      } else {
        const res = await api.createLogo(payload);
        if (res.success) {
          setLogos((prev) =>
            [...prev, res.data].sort((a, b) => (a.order || 0) - (b.order || 0))
          );
          setIsLogoModalOpen(false);
          showLogoFeedback(`Added logo "${payload.name}" to homepage marquee!`);
        } else {
          showLogoFeedback(res.message || 'Failed to create logo', 'error');
        }
      }
    } catch (err) {
      console.error('Error saving logo:', err);
      showLogoFeedback('Error communicating with server', 'error');
    }
  };

  const handleToggleLogoActive = async (logo) => {
    const logoId = logo.id || logo._id;
    const newStatus = !logo.isActive;
    try {
      const res = await api.updateLogo(logoId, { isActive: newStatus });
      if (res.success) {
        setLogos((prev) =>
          prev.map((l) => (l.id === logoId || l._id === logoId ? { ...l, isActive: newStatus } : l))
        );
        showLogoFeedback(`Logo "${logo.name}" ${newStatus ? 'is now visible on homepage' : 'is now hidden'}`);
      }
    } catch (err) {
      console.error('Error toggling logo active state:', err);
    }
  };

  const handleDeleteLogo = async (id) => {
    try {
      const res = await api.deleteLogo(id);
      if (res.success) {
        setLogos((prev) => prev.filter((l) => l.id !== id && l._id !== id));
        setDeleteConfirmLogoId(null);
        showLogoFeedback('Partner logo deleted successfully');
      } else {
        showLogoFeedback(res.message || 'Failed to delete logo', 'error');
      }
    } catch (err) {
      console.error('Error deleting logo:', err);
      showLogoFeedback('Error communicating with server', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              Client Home Page (/)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Home Page Content & Brand Assets
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Edit Hero titles, Why JAC narrative story points, Client Partner Logos, and target industries.
          </p>
        </div>

        <a
          href="http://localhost:5173/"
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Eye className="w-4 h-4" />
          <span>View Public Page</span>
        </a>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto">
        <button
          onClick={() => handleTabChange('hero')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Hero Banner
        </button>

        <button
          onClick={() => handleTabChange('story')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'story'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Why JAC Narrative Tabs ({homeContent.storyItems?.length || 4})
        </button>

        <button
          onClick={() => handleTabChange('industries')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'industries'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Industries We Serve ({industries.length})
        </button>

        <button
          onClick={() => handleTabChange('logos')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'logos'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Partner Logos ({logos.length})</span>
        </button>
      </div>

      {/* TAB 1: HERO BANNER */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveContent} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">Hero Section Copy & CTAs</h2>
              <p className="text-neutral-600 text-xs">Configure the top-of-funnel messaging on the homepage.</p>
            </div>
            {contentSavedMsg && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Saved successfully
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Eyebrow / Tagline</label>
            <input
              type="text"
              value={homeContent.heroTagline || ''}
              onChange={(e) => setHomeContent({ ...homeContent, heroTagline: e.target.value })}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Headline (Primary)</label>
              <input
                type="text"
                value={homeContent.heroHeading || ''}
                onChange={(e) => setHomeContent({ ...homeContent, heroHeading: e.target.value })}
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Headline (Italic Accent)</label>
              <input
                type="text"
                value={homeContent.heroHeadingItalic || ''}
                onChange={(e) => setHomeContent({ ...homeContent, heroHeadingItalic: e.target.value })}
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1.5">Hero Subtitle / Description</label>
            <textarea
              rows={3}
              value={homeContent.heroDescription || ''}
              onChange={(e) => setHomeContent({ ...homeContent, heroDescription: e.target.value })}
              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Primary Button Text</label>
              <input
                type="text"
                value={homeContent.primaryCtaText || ''}
                onChange={(e) => setHomeContent({ ...homeContent, primaryCtaText: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black mb-3"
              />
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Primary Button Link</label>
              <input
                type="text"
                value={homeContent.primaryCtaLink || ''}
                onChange={(e) => setHomeContent({ ...homeContent, primaryCtaLink: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Secondary Button Text</label>
              <input
                type="text"
                value={homeContent.secondaryCtaText || ''}
                onChange={(e) => setHomeContent({ ...homeContent, secondaryCtaText: e.target.value })}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black mb-3"
              />
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Secondary Button Link</label>
              <input
                type="text"
                value={homeContent.secondaryCtaLink || ''}
                onChange={(e) => setHomeContent({ ...homeContent, secondaryCtaLink: e.target.value })}
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
              <span>{savingContent ? 'Saving...' : 'Save Hero Settings'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: STORY ACCORDIONS */}
      {activeTab === 'story' && (
        <form onSubmit={handleSaveContent} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">Why JAC MediaLand Narrative Accordions</h2>
              <p className="text-neutral-600 text-xs">Edit the four accordion points and performance statistics.</p>
            </div>
            {contentSavedMsg && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-3.5 h-3.5" /> Saved successfully
              </span>
            )}
          </div>

          <div className="space-y-6">
            {(homeContent.storyItems || []).map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-900 uppercase">
                    Accordion Point #{idx + 1}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const updated = [...homeContent.storyItems];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setHomeContent({ ...homeContent, storyItems: updated });
                    }}
                    className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-600 mb-1">Content Body</label>
                  <textarea
                    rows={2}
                    value={item.content || ''}
                    onChange={(e) => {
                      const updated = [...homeContent.storyItems];
                      updated[idx] = { ...updated[idx], content: e.target.value };
                      setHomeContent({ ...homeContent, storyItems: updated });
                    }}
                    className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-2 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">Metric Number</label>
                    <input
                      type="text"
                      value={item.stat || ''}
                      onChange={(e) => {
                        const updated = [...homeContent.storyItems];
                        updated[idx] = { ...updated[idx], stat: e.target.value };
                        setHomeContent({ ...homeContent, storyItems: updated });
                      }}
                      placeholder="e.g. 99/100"
                      className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-1.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-600 mb-1">Metric Label</label>
                    <input
                      type="text"
                      value={item.statLabel || ''}
                      onChange={(e) => {
                        const updated = [...homeContent.storyItems];
                        updated[idx] = { ...updated[idx], statLabel: e.target.value };
                        setHomeContent({ ...homeContent, storyItems: updated });
                      }}
                      placeholder="e.g. Average Google PageSpeed"
                      className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-4 py-1.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={savingContent}
              className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{savingContent ? 'Saving...' : 'Save Narrative Points'}</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: INDUSTRIES */}
      {activeTab === 'industries' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">Industries We Serve</h2>
              <p className="text-neutral-600 text-xs">Manage the interactive 16 sectors shown on the homepage.</p>
            </div>
            <button
              onClick={openCreateIndModal}
              className="py-2 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Industry
            </button>
          </div>

          {loadingIndustries ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading industries...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {industries.map((ind) => (
                <div
                  key={ind._id}
                  className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-4 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <Wind className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500">#{ind.order}</span>
                    </div>
                    <h3 className="font-bold text-neutral-950 text-sm">{ind.title}</h3>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{ind.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100">
                    <button
                      onClick={() => openEditIndModal(ind)}
                      className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                      title="Edit Industry"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {deleteConfirmIndId === ind._id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDeleteInd(ind._id)}
                          className="py-1 px-1.5 rounded-lg bg-rose-600 text-white text-[10px] font-bold"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmIndId(null)}
                          className="py-1 px-1 rounded-lg bg-neutral-100 text-neutral-600 text-[10px]"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmIndId(ind._id)}
                        className="p-1 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Industry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CLIENT PARTNER LOGOS */}
      {activeTab === 'logos' && (
        <div className="space-y-6">
          {/* Section Header */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Homepage Component — LogosMarquee
                </span>
                <span className="bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {logos.length} LOGOS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                Client & Partner Brand Logos
              </h2>
              <p className="text-neutral-600 text-xs sm:text-sm mt-1 max-w-2xl">
                These logos scroll infinitely in bidirectional rows on the homepage below the Capabilities & Services section. Add new partner logos, edit brand names, reorder them, toggle active status, or delete old logos.
              </p>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-neutral-100">
                <span className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-lg font-medium">
                  Total: <strong className="text-neutral-950 font-bold">{logos.length}</strong>
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-lg font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active on Home: <strong className="font-bold">{logos.filter((l) => l.isActive !== false).length}</strong>
                </span>
                <span className="text-xs bg-neutral-100 text-neutral-500 px-3 py-1 rounded-lg font-medium">
                  Hidden: <strong className="text-neutral-700 font-bold">{logos.filter((l) => l.isActive === false).length}</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={openCreateLogoModal}
                className="py-3 px-5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner Logo</span>
              </button>
            </div>
          </div>

          {/* Feedback banner */}
          {logoFeedback && (
            <div
              className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                logoFeedback.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{logoFeedback.msg}</span>
              </div>
              <button
                type="button"
                onClick={() => setLogoFeedback(null)}
                className="text-neutral-500 hover:text-neutral-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Logos Grid */}
          {loadingLogos ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-500 text-sm">
              Loading client partner logos...
            </div>
          ) : logos.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">
              <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-950">No Partner Logos Found</h3>
              <p className="text-neutral-600 text-xs mt-1 mb-4">
                Click the button below to add your first client partner logo.
              </p>
              <button
                type="button"
                onClick={openCreateLogoModal}
                className="py-2.5 px-5 rounded-xl bg-black text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Partner Logo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {logos.map((logo) => (
                <div
                  key={logo.id || logo._id}
                  className={`bg-white border rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-sm ${
                    logo.isActive === false
                      ? 'border-neutral-200 opacity-60 bg-neutral-50/50'
                      : 'border-neutral-200 hover:border-black'
                  }`}
                >
                  {/* Card Top: Order and Active Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                      Order #{logo.order || 0}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleToggleLogoActive(logo)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${
                        logo.isActive !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-neutral-100 text-neutral-500 border-neutral-200 hover:bg-neutral-200'
                      }`}
                      title={logo.isActive !== false ? 'Click to hide from website' : 'Click to show on website'}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          logo.isActive !== false ? 'bg-emerald-500' : 'bg-neutral-400'
                        }`}
                      ></span>
                      {logo.isActive !== false ? 'Active' : 'Hidden'}
                    </button>
                  </div>

                  {/* Image Preview Box */}
                  <div className="h-28 rounded-xl bg-neutral-50 border border-neutral-100 p-3 flex items-center justify-center relative overflow-hidden group mb-3">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="10">Image Preview</text></svg>';
                      }}
                      className="max-h-16 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Logo Details */}
                  <div className="space-y-1 mb-4">
                    <h3 className="font-bold text-neutral-950 text-sm truncate" title={logo.name}>
                      {logo.name}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400 truncate" title={logo.src}>
                      {logo.src}
                    </p>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openEditLogoModal(logo)}
                      className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmLogoId === (logo.id || logo._id) ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDeleteLogo(logo.id || logo._id)}
                          className="py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmLogoId(null)}
                          className="py-1.5 px-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmLogoId(logo.id || logo._id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Logo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* INDUSTRY MODAL */}
      {isIndModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsIndModalOpen(false);
          }}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingInd ? 'Edit Industry Sector' : 'Add Industry Sector'}
              </h2>
              <button
                onClick={() => setIsIndModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIndSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Industry Name *</label>
                <input
                  type="text"
                  required
                  value={indForm.title}
                  onChange={(e) => setIndForm({ ...indForm, title: e.target.value })}
                  placeholder="e.g. Agriculture / Bank / Logistics"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={indForm.subtitle}
                  onChange={(e) => setIndForm({ ...indForm, subtitle: e.target.value })}
                  placeholder="SOLUTIONS & TECH"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={indForm.order}
                  onChange={(e) => setIndForm({ ...indForm, order: e.target.value })}
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsIndModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold"
                >
                  Save Industry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LOGO ADD / EDIT MODAL */}
      {isLogoModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLogoModalOpen(false);
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
        >
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <h2 className="text-xl font-bold text-neutral-950">
                  {editingLogo ? 'Edit Partner Logo' : 'Add New Partner Logo'}
                </h2>
                <p className="text-neutral-500 text-xs mt-0.5">Homepage Marquee Showcase</p>
              </div>
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                  Brand / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={logoForm.name}
                  onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                  placeholder="e.g. NIIT, Shopify, Fiverr, Upwork..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <ImageUploadDropzone
                label="Partner Logo Asset"
                value={logoForm.src}
                onChange={(newSrc) => setLogoForm({ ...logoForm, src: newSrc })}
                hint="Drag & drop transparent PNG or SVG logo, or browse file"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={logoForm.order}
                    onChange={(e) => setLogoForm({ ...logoForm, order: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">Lower numbers appear first.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Visibility Status
                  </label>
                  <label className="flex items-center gap-2.5 h-[42px] px-3 bg-neutral-50 border border-neutral-300 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={logoForm.isActive}
                      onChange={(e) => setLogoForm({ ...logoForm, isActive: e.target.checked })}
                      className="w-4 h-4 accent-black rounded cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-neutral-900">
                      Active on Homepage
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold transition-all shadow-xs cursor-pointer"
                >
                  {editingLogo ? 'Save Changes' : 'Add Logo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomeContent;
