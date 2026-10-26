import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, MessageSquare, Clock, CheckCircle, Plus, Eye, X } from 'lucide-react';
import { api } from '../services/api';

const statusList = ['All', 'New', 'In Review', 'Contacted', 'Proposal Sent', 'Closed'];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await api.getEnquiries({
        search,
        status: statusFilter
      });
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const res = await api.updateEnquiryStatus(id, { status: newStatus });
      if (res.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;
    setActionLoading(true);
    try {
      const res = await api.updateEnquiryStatus(selectedEnquiry._id, {
        note: newNote,
        author: 'Admin'
      });
      if (res.success) {
        setSelectedEnquiry(res.data);
        setEnquiries((prev) =>
          prev.map((e) => (e._id === res.data._id ? res.data : e))
        );
        setNewNote('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-900 font-bold block mb-1">
          Client Pipeline
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-950 font-sans-tight">
          Client Enquiries
        </h1>
        <p className="text-neutral-600 text-sm mt-1">
          Review, categorize, and follow up with incoming corporate client requests.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, service..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-950 placeholder-neutral-500 focus:outline-none focus:border-amber-300"
          />
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {statusList.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-black text-white font-bold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-3 border-amber-300 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs text-neutral-600">Loading pipeline...</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-neutral-600 text-sm">
            No inquiries match your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-600 uppercase tracking-wider font-mono bg-neutral-50/40">
                  <th className="p-4 font-medium">Client Info</th>
                  <th className="p-4 font-medium">Service & Budget</th>
                  <th className="p-4 font-medium">Received Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/60">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-neutral-100/30">
                    <td className="p-4">
                      <span className="font-bold text-neutral-950 text-sm block">{enq.name}</span>
                      <span className="text-neutral-600 block">{enq.email}</span>
                      {enq.phone && <span className="text-neutral-500 block text-[11px]">{enq.phone}</span>}
                    </td>

                    <td className="p-4">
                      <span className="text-neutral-800 font-medium block">{enq.service}</span>
                      <span className="text-neutral-900 font-mono text-[11px] block">{enq.budget}</span>
                    </td>

                    <td className="p-4 text-neutral-600 font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className="px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-300 text-neutral-950 text-[11px] focus:outline-none focus:border-amber-300"
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                        title="View Full Message & Notes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div>
                <span className="text-xs uppercase font-mono text-neutral-900">Enquiry Details</span>
                <h3 className="text-xl font-bold text-neutral-950">{selectedEnquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              <div>
                <span className="text-neutral-500 block">Email:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-neutral-950 font-medium underline">
                  {selectedEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-neutral-500 block">Phone:</span>
                <span className="text-neutral-950 font-medium">{selectedEnquiry.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Service:</span>
                <span className="text-neutral-900 font-medium">{selectedEnquiry.service}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Budget:</span>
                <span className="text-neutral-900 font-medium">{selectedEnquiry.budget}</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-mono text-neutral-600 block mb-2">Message:</span>
              <div className="p-4 rounded-xl bg-neutral-50 text-neutral-800 text-sm leading-relaxed border border-neutral-200">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div>
              <span className="text-xs uppercase font-mono text-neutral-600 block mb-2">
                Internal Team Notes:
              </span>
              <div className="space-y-2 mb-4">
                {(selectedEnquiry.internalNotes || []).length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">No notes added yet.</p>
                ) : (
                  selectedEnquiry.internalNotes.map((note, nIdx) => (
                    <div key={nIdx} className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs">
                      <p className="text-neutral-700">{note.text}</p>
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Added by {note.author} on {new Date(note.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an internal follow-up note..."
                  className="flex-1 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-950 placeholder-neutral-500 focus:outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
