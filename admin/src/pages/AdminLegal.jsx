import React, { useState, useEffect } from 'react';
import {
  Shield,
  Save,
  Plus,
  Trash2,
  Check,
  Eye,
  FileText
} from 'lucide-react';
import { api } from '../services/api';

const AdminLegal = () => {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' | 'terms'
  const [legalData, setLegalData] = useState({
    privacyPolicy: {
      title: 'Privacy Policy',
      lastUpdated: 'January 2026',
      sections: []
    },
    termsOfService: {
      title: 'Terms of Service',
      lastUpdated: 'January 2026',
      sections: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.getPageContent('legal');
      if (res.success && res.data) {
        setLegalData(res.data);
      }
    } catch (err) {
      console.error('Error loading legal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.updatePageContent('legal', legalData);
      if (res.success) {
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
      }
    } catch (err) {
      console.error('Error saving legal data:', err);
    } finally {
      setSaving(false);
    }
  };

  const currentDoc = activeTab === 'privacy' ? legalData.privacyPolicy : legalData.termsOfService;

  const updateCurrentDoc = (updatedDoc) => {
    if (activeTab === 'privacy') {
      setLegalData({ ...legalData, privacyPolicy: updatedDoc });
    } else {
      setLegalData({ ...legalData, termsOfService: updatedDoc });
    }
  };

  const addSection = () => {
    const sections = [...(currentDoc.sections || [])];
    sections.push({
      heading: `${sections.length + 1}. New Clause / Section`,
      content: 'Enter clause text, policy stipulations, and details...'
    });
    updateCurrentDoc({ ...currentDoc, sections });
  };

  const removeSection = (idx) => {
    const sections = currentDoc.sections.filter((_, i) => i !== idx);
    updateCurrentDoc({ ...currentDoc, sections });
  };

  const updateSectionField = (idx, field, value) => {
    const sections = [...currentDoc.sections];
    sections[idx] = { ...sections[idx], [field]: value };
    updateCurrentDoc({ ...currentDoc, sections });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              Legal Compliance Pages (/privacy & /terms)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage legal disclosures, data compliance guidelines, non-disclosure terms, and terms of service.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={activeTab === 'privacy' ? 'http://localhost:5173/privacy' : 'http://localhost:5173/terms'}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Public Page</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Privacy Policy ({legalData.privacyPolicy?.sections?.length || 0} Clauses)
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Terms of Service ({legalData.termsOfService?.sections?.length || 0} Clauses)
        </button>
      </div>

      {/* Form */}
      {loading ? (
        <div className="py-20 text-center text-neutral-600 text-sm">
          Loading legal content...
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">
                {activeTab === 'privacy' ? 'Privacy Policy Document' : 'Terms of Service Document'}
              </h2>
              <p className="text-neutral-600 text-xs">
                Add, edit, or remove clauses with immediate client update.
              </p>
            </div>

            {savedMsg && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <Check className="w-3.5 h-3.5" /> Saved successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Document Title</label>
              <input
                type="text"
                value={currentDoc?.title || ''}
                onChange={(e) => updateCurrentDoc({ ...currentDoc, title: e.target.value })}
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1.5">Last Updated Stamp</label>
              <input
                type="text"
                value={currentDoc?.lastUpdated || ''}
                onChange={(e) => updateCurrentDoc({ ...currentDoc, lastUpdated: e.target.value })}
                placeholder="e.g. January 2026"
                className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-950 uppercase tracking-wider">
                Document Sections & Clauses
              </h3>
              <button
                type="button"
                onClick={addSection}
                className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-900" />
                <span>Add Clause</span>
              </button>
            </div>

            {(currentDoc?.sections || []).map((sec, sIdx) => (
              <div key={sIdx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={sec.heading || ''}
                    onChange={(e) => updateSectionField(sIdx, 'heading', e.target.value)}
                    placeholder="Section Heading"
                    className="flex-1 bg-neutral-100 border border-neutral-300 rounded-lg px-3 py-1.5 text-neutral-950 text-sm font-semibold focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(sIdx)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    title="Remove Clause"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={sec.content || ''}
                  onChange={(e) => updateSectionField(sIdx, 'content', e.target.value)}
                  placeholder="Section paragraph content..."
                  className="w-full bg-neutral-100 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-950 text-xs leading-relaxed focus:outline-none focus:border-black"
                />
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Legal Document'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminLegal;
