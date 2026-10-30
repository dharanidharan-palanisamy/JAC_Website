import React, { useState, useEffect } from 'react';
import { Save, Check, Globe, Phone, Mail, MapPin, Sparkles, IndianRupee, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    siteName: 'JAC MediaLand IT Solutions',
    tagline: 'Engineering Digital Excellence',
    contactEmail: 'contact@jacmedialand.com',
    contactPhone: '+91 98765 43210',
    address: 'Tech Innovation Hub, Coimbatore, Tamil Nadu, India',
    budgetOptions: [
      'Under ₹50,000',
      '₹50,000 - ₹1,00,000',
      '₹1,00,000 - ₹2,50,000',
      '₹2,50,000+'
    ],
    hero: {
      eyebrow: 'Full-Service Digital IT Solutions',
      headlineStart: 'Iconic digital experiences',
      headlineItalic: 'engineered with passion.',
      subheadline:
        'We craft high-performance web applications, enterprise mobile apps, and transformative design systems for forward-thinking brands worldwide.'
    },
    stats: {
      projectsCompleted: '150+',
      happyClients: '98%',
      yearsExperience: '8+',
      expertDevelopers: '25+'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/company/jacmedialand',
      twitter: 'https://twitter.com/jacmedialand',
      github: 'https://github.com/jacmedialand',
      instagram: 'https://instagram.com/jacmedialand'
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data) {
          setFormData((prev) => ({
            ...prev,
            ...res.data,
            budgetOptions:
              res.data.budgetOptions && res.data.budgetOptions.length > 0
                ? res.data.budgetOptions
                : prev.budgetOptions,
            hero: { ...prev.hero, ...(res.data.hero || {}) },
            stats: { ...prev.stats, ...(res.data.stats || {}) },
            socialLinks: { ...prev.socialLinks, ...(res.data.socialLinks || {}) }
          }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleBudgetChange = (index, value) => {
    const updated = [...formData.budgetOptions];
    updated[index] = value;
    setFormData({ ...formData, budgetOptions: updated });
  };

  const handleAddBudget = () => {
    setFormData({
      ...formData,
      budgetOptions: [...formData.budgetOptions, '']
    });
  };

  const handleRemoveBudget = (index) => {
    const updated = formData.budgetOptions.filter((_, i) => i !== index);
    setFormData({ ...formData, budgetOptions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await api.updateSettings(formData);
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-neutral-600 text-sm">Loading configuration...</div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold block mb-1">
            System Configuration
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-sans-tight">
            Website Settings
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Configure global website metadata, hero narratives, corporate statistics, and contact channels.
          </p>
        </div>

        {saved && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Meta Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4">
          <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
            <Globe className="w-5 h-5 text-neutral-900" />
            <span>Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Brand / Site Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4">
          <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neutral-900" />
            <span>Homepage Hero Banner</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Eyebrow Badge Text</label>
              <input
                type="text"
                value={formData.hero.eyebrow}
                onChange={(e) =>
                  setFormData({ ...formData, hero: { ...formData.hero, eyebrow: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Headline Part 1 (Regular)</label>
                <input
                  type="text"
                  value={formData.hero.headlineStart}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...formData.hero, headlineStart: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Headline Part 2 (Serif Italic Accent)</label>
                <input
                  type="text"
                  value={formData.hero.headlineItalic}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...formData.hero, headlineItalic: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Subheadline Narrative</label>
              <textarea
                rows="2"
                value={formData.hero.subheadline}
                onChange={(e) =>
                  setFormData({ ...formData, hero: { ...formData.hero, subheadline: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Corporate Key Stats */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4">
          <h3 className="text-lg font-bold text-neutral-950">Company Metrics & Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Projects Done</label>
              <input
                type="text"
                value={formData.stats.projectsCompleted}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, projectsCompleted: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Happy Clients %</label>
              <input
                type="text"
                value={formData.stats.happyClients}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, happyClients: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Years Experience</label>
              <input
                type="text"
                value={formData.stats.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, yearsExperience: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Developers</label>
              <input
                type="text"
                value={formData.stats.expertDevelopers}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, expertDevelopers: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 space-y-4">
          <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
            <Mail className="w-5 h-5 text-neutral-900" />
            <span>Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-700 font-semibold block mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-neutral-700 font-semibold block mb-1">Corporate Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Project Inquiries & Budget Ranges (Pricing Tiers) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-neutral-900" />
                <span>Estimated Budget / Pricing Tiers</span>
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Customize the price tier options displayed to users on the Contact form and Service Proposal forms.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddBudget}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold self-start sm:self-auto cursor-pointer transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Budget Option</span>
            </button>
          </div>

          <div className="space-y-3">
            {(formData.budgetOptions || []).map((opt, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs font-mono font-bold text-neutral-400 w-6 text-right">
                  #{index + 1}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleBudgetChange(index, e.target.value)}
                  placeholder="e.g. ₹50,000 - ₹1,00,000"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-neutral-900 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveBudget(index)}
                  disabled={formData.budgetOptions.length <= 1}
                  className="p-2.5 rounded-xl border border-neutral-200 text-neutral-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  title="Remove tier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
            <span className="font-bold text-neutral-900 block mb-2">Live Button Preview on Contact Form:</span>
            <div className="flex flex-wrap gap-2">
              {(formData.budgetOptions || []).filter(Boolean).map((b, i) => (
                <span
                  key={i}
                  className="px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-xs font-medium shadow-2xs"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <div className="text-xs text-neutral-500 text-center sm:text-left">
            {saved ? (
              <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Saved successfully! Changes are now live across the entire website.</span>
              </span>
            ) : (
              <span>Click "Save Settings" to publish all configuration updates to the live website.</span>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50 ${
              saved
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-black hover:bg-neutral-800 text-white'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving Changes...' : saved ? 'Settings Saved!' : 'Save Settings'}</span>
          </button>
        </div>
      </form>

      {/* Floating Popup Notification on Save */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] p-4 rounded-2xl bg-neutral-950 text-white shadow-2xl border border-neutral-800 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-bold text-white">Settings Saved Successfully!</h4>
            <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
              Your updates have been saved to the database and are now live across the entire website.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSaved(false)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Dismiss popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
