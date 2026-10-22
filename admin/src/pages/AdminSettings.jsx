import React, { useState, useEffect } from 'react';
import { Save, Check, Globe, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
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
      <div className="p-12 text-center text-neutral-400 text-sm">Loading configuration...</div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block mb-1">
            System Configuration
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-white font-sans-tight">
            Website Settings
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
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
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-300" />
            <span>Brand Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Brand / Site Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Copy */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Homepage Hero Banner</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Eyebrow Badge Text</label>
              <input
                type="text"
                value={formData.hero.eyebrow}
                onChange={(e) =>
                  setFormData({ ...formData, hero: { ...formData.hero, eyebrow: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Headline Part 1 (Regular)</label>
                <input
                  type="text"
                  value={formData.hero.headlineStart}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...formData.hero, headlineStart: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-300 font-semibold block mb-1">Headline Part 2 (Serif Italic Accent)</label>
                <input
                  type="text"
                  value={formData.hero.headlineItalic}
                  onChange={(e) =>
                    setFormData({ ...formData, hero: { ...formData.hero, headlineItalic: e.target.value } })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Subheadline Narrative</label>
              <textarea
                rows="2"
                value={formData.hero.subheadline}
                onChange={(e) =>
                  setFormData({ ...formData, hero: { ...formData.hero, subheadline: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Corporate Key Stats */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Company Metrics & Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Projects Done</label>
              <input
                type="text"
                value={formData.stats.projectsCompleted}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, projectsCompleted: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Happy Clients %</label>
              <input
                type="text"
                value={formData.stats.happyClients}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, happyClients: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Years Experience</label>
              <input
                type="text"
                value={formData.stats.yearsExperience}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, yearsExperience: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Developers</label>
              <input
                type="text"
                value={formData.stats.expertDevelopers}
                onChange={(e) =>
                  setFormData({ ...formData, stats: { ...formData.stats, expertDevelopers: e.target.value } })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-300" />
            <span>Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="text-neutral-300 font-semibold block mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-neutral-300 font-semibold block mb-1">Corporate Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-300"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
