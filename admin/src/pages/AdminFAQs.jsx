import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { api } from '../services/api';

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = {
    question: '',
    answer: '',
    category: 'General',
    order: 0,
    isActive: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await api.getAllFAQsAdmin();
      if (res.success) {
        setFaqs(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingFaq(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'General',
      order: faq.order || 0,
      isActive: faq.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingFaq) {
        const res = await api.updateFAQ(editingFaq._id, formData);
        if (res.success) {
          fetchFaqs();
          setIsModalOpen(false);
        }
      } else {
        const res = await api.createFAQ(formData);
        if (res.success) {
          fetchFaqs();
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
    if (!window.confirm('Delete this FAQ entry?')) return;
    try {
      const res = await api.deleteFAQ(id);
      if (res.success) {
        setFaqs((prev) => prev.filter((f) => f._id !== id));
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
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold block mb-1">
            Knowledge Base
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-sans-tight">
            FAQs Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage frequently asked questions displayed on the home and support pages.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-neutral-600 text-sm">Loading FAQs...</div>
        ) : (
          faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <span className="text-[10px] font-mono text-neutral-900 uppercase block mb-1">
                  Category: {faq.category}
                </span>
                <h3 className="text-base font-bold text-neutral-950 mb-2">{faq.question}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => openEditModal(faq)}
                  className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
              <h3 className="text-xl font-bold text-neutral-950">
                {editingFaq ? 'Edit FAQ' : 'Create New FAQ'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="e.g. What is your standard project timeline?"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Answer *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Comprehensive answer explanation..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-neutral-700 font-semibold block mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="General / Engineering / Pricing"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-950 text-sm focus:outline-none focus:border-amber-300"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
