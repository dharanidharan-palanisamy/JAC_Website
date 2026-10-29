import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  MapPin,
  Clock,
  Laptop,
  CheckCircle2,
  Smile,
  GraduationCap,
  HeartHandshake,
  FileText,
  Download,
  ExternalLink,
  Mail,
  Phone,
  User,
  Inbox
} from 'lucide-react';
import { api } from '../services/api';

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'perks' | 'applications'
  const [jobs, setJobs] = useState([]);
  const [perks, setPerks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [deleteConfirmAppId, setDeleteConfirmAppId] = useState(null);
  const [loading, setLoading] = useState(true);


  // Job Modal
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [savingJob, setSavingJob] = useState(false);
  const [deleteConfirmJobId, setDeleteConfirmJobId] = useState(null);

  // Perk Modal
  const [isPerkModalOpen, setIsPerkModalOpen] = useState(false);
  const [editingPerk, setEditingPerk] = useState(null);
  const [savingPerk, setSavingPerk] = useState(false);
  const [deleteConfirmPerkId, setDeleteConfirmPerkId] = useState(null);

  const initialJobForm = {
    title: '',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Chennai / Coimbatore / Remote',
    experience: '3 - 6 Years',
    salary: '₹12L - ₹20L PA',
    description: '',
    responsibilities: 'Architect backend microservices\nCollaborate with frontend engineers\nOptimize database performance',
    requirements: 'Strong proficiency in TypeScript and React\nExperience with PostgreSQL and Docker\nPassionate about clean architecture',
    order: 1,
    isActive: true
  };
  const [jobForm, setJobForm] = useState(initialJobForm);

  const initialPerkForm = {
    title: '',
    desc: '',
    icon: 'Laptop'
  };
  const [perkForm, setPerkForm] = useState(initialPerkForm);

  const loadCareersData = async () => {
    setLoading(true);
    try {
      const [jobsRes, perksRes, appsRes] = await Promise.all([
        api.getAllCareersAdmin(),
        api.getPerks(),
        api.getApplicationsAdmin()
      ]);
      if (jobsRes.success) setJobs(jobsRes.data);
      if (perksRes.success) setPerks(perksRes.data);
      if (appsRes?.success) setApplications(appsRes.data);
    } catch (err) {
      console.error('Error loading careers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCareersData();
  }, []);

  const handleStatusChange = async (appId, newStatus) => {
    try {
      const res = await api.updateApplicationStatus(appId, newStatus);
      if (res.success) {
        setApplications(applications.map((a) => (a._id === appId ? { ...a, status: newStatus } : a)));
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteApplication = async (appId) => {
    try {
      const res = await api.deleteApplication(appId);
      if (res.success) {
        setApplications(applications.filter((a) => a._id !== appId));
        setDeleteConfirmAppId(null);
      }
    } catch (err) {
      console.error('Error deleting application:', err);
    }
  };

  const handleDownloadResume = (app) => {
    if (app.resumeFile && app.resumeFile.startsWith('data:')) {
      const a = document.createElement('a');
      a.href = app.resumeFile;
      a.download = app.resumeFileName || `${app.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (app.resumeUrl) {
      window.open(app.resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Job Handlers
  const openCreateJobModal = () => {
    setEditingJob(null);
    setJobForm({
      ...initialJobForm,
      order: jobs.length + 1
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title || '',
      department: job.department || 'Engineering',
      type: job.type || 'Full-time',
      location: job.location || '',
      experience: job.experience || '',
      salary: job.salary || '',
      description: job.description || '',
      responsibilities: (job.responsibilities || []).join('\n'),
      requirements: (job.requirements || []).join('\n'),
      order: job.order || 1,
      isActive: job.isActive !== false
    });
    setIsJobModalOpen(true);
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setSavingJob(true);
    try {
      const payload = {
        ...jobForm,
        responsibilities: jobForm.responsibilities.split('\n').map((r) => r.trim()).filter(Boolean),
        requirements: jobForm.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
        order: Number(jobForm.order) || 1
      };

      if (editingJob) {
        const res = await api.updateJob(editingJob._id, payload);
        if (res.success) {
          loadCareersData();
          setIsJobModalOpen(false);
        }
      } else {
        const res = await api.createJob(payload);
        if (res.success) {
          loadCareersData();
          setIsJobModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving job:', err);
    } finally {
      setSavingJob(false);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await api.deleteJob(id);
      if (res.success) {
        setJobs(jobs.filter((j) => j._id !== id));
        setDeleteConfirmJobId(null);
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  // Perk Handlers
  const openCreatePerkModal = () => {
    setEditingPerk(null);
    setPerkForm(initialPerkForm);
    setIsPerkModalOpen(true);
  };

  const openEditPerkModal = (perk) => {
    setEditingPerk(perk);
    setPerkForm({
      title: perk.title || '',
      desc: perk.desc || '',
      icon: perk.icon || 'Laptop'
    });
    setIsPerkModalOpen(true);
  };

  const handlePerkSubmit = async (e) => {
    e.preventDefault();
    setSavingPerk(true);
    try {
      if (editingPerk) {
        const res = await api.updatePerk(editingPerk._id, perkForm);
        if (res.success) {
          loadCareersData();
          setIsPerkModalOpen(false);
        }
      } else {
        const res = await api.createPerk(perkForm);
        if (res.success) {
          loadCareersData();
          setIsPerkModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving perk:', err);
    } finally {
      setSavingPerk(false);
    }
  };

  const handleDeletePerk = async (id) => {
    try {
      const res = await api.deletePerk(id);
      if (res.success) {
        setPerks(perks.filter((p) => p._id !== id));
        setDeleteConfirmPerkId(null);
      }
    } catch (err) {
      console.error('Error deleting perk:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-950">
              Client Careers Page (/careers)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Careers & Hiring Management
          </h1>
          <p className="text-neutral-600 text-sm mt-1">
            Publish, edit, and remove job vacancies, compensation ranges, and company perks.
          </p>
        </div>

        <a
          href="http://localhost:5173/careers"
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
          onClick={() => setActiveTab('jobs')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Job Postings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab('perks')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'perks'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          Company Perks ({perks.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'applications'
              ? 'bg-black text-white shadow-xs'
              : 'text-neutral-600 hover:text-neutral-950 hover:bg-white'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Applications ({applications.length})</span>
        </button>
      </div>

      {/* TAB 1: JOBS */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-950">Active Job Vacancies</h2>
            <button
              onClick={openCreateJobModal}
              className="py-2 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Job Opening
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading job postings...
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-neutral-600">
              No job postings found. Click Add Job Opening to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-2xl p-5 sm:p-6 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-900 border border-amber-400/20 font-semibold">
                          {job.department}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          {job.type}
                        </span>
                        {job.isActive === false && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Inactive / Draft
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-neutral-950">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                          {job.location}
                        </span>
                        <span>Exp: {job.experience}</span>
                        <span className="font-semibold text-emerald-400">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => openEditJobModal(job)}
                        className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>

                      {deleteConfirmJobId === job._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="py-1.5 px-2.5 rounded-lg bg-rose-600 text-neutral-950 text-xs font-bold"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmJobId(null)}
                            className="py-1.5 px-2 rounded-lg bg-neutral-100 text-neutral-600 text-xs"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmJobId(job._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                          title="Delete Job"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-neutral-50/40 p-3 rounded-xl border border-neutral-200">
                    <div>
                      <span className="font-bold text-neutral-600 block mb-1">Key Responsibilities:</span>
                      <ul className="space-y-1 text-neutral-700">
                        {(job.responsibilities || []).slice(0, 2).map((r, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-bold text-neutral-600 block mb-1">Requirements:</span>
                      <ul className="space-y-1 text-neutral-700">
                        {(job.requirements || []).slice(0, 2).map((req, qIdx) => (
                          <li key={qIdx} className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 className="w-3 h-3 text-neutral-950 shrink-0" />
                            <span className="truncate">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PERKS */}
      {activeTab === 'perks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-950">Employee Perks & Benefits</h2>
            <button
              onClick={openCreatePerkModal}
              className="py-2 px-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Perk
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {perks.map((perk) => (
              <div
                key={perk._id}
                className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-950">{perk.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditPerkModal(perk)}
                    className="py-1 px-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>

                  {deleteConfirmPerkId === perk._id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeletePerk(perk._id)}
                        className="py-1 px-2 rounded-lg bg-rose-600 text-neutral-950 text-xs font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmPerkId(null)}
                        className="py-1 px-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmPerkId(perk._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-950">Candidate Applications</h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                Review submitted resumes, contact info, and portfolio links from candidates.
              </p>
            </div>
            <button
              onClick={loadCareersData}
              className="py-1.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center text-neutral-600 text-sm">
              Loading candidate applications...
            </div>
          ) : applications.length === 0 ? (
            <div className="py-16 text-center bg-white border border-neutral-200 rounded-3xl p-8 space-y-3">
              <Inbox className="w-10 h-10 text-neutral-400 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-neutral-900">No applications received yet</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Candidate submissions from the public Careers page modal will automatically appear here with their attached resumes.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="p-5 sm:p-6 bg-white border border-neutral-200 rounded-2xl space-y-4 shadow-xs hover:border-neutral-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                          <User className="w-4 h-4 text-neutral-600" />
                          <span>{app.name}</span>
                        </h3>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                          {app.jobTitle}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-50 text-neutral-500 border border-neutral-200">
                          {app.department}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-neutral-600 flex-wrap pt-1">
                        <a
                          href={`mailto:${app.email}`}
                          className="flex items-center gap-1.5 text-neutral-800 hover:text-black hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{app.email}</span>
                        </a>
                        <a
                          href={`tel:${app.phone}`}
                          className="flex items-center gap-1.5 text-neutral-800 hover:text-black hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{app.phone}</span>
                        </a>
                        {app.portfolio && (
                          <a
                            href={app.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-black font-semibold hover:underline"
                          >
                            <span>Portfolio / GitHub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      {/* Status Selector */}
                      <select
                        value={app.status || 'New'}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-black cursor-pointer"
                      >
                        <option value="New">Status: New</option>
                        <option value="Reviewing">Status: Reviewing</option>
                        <option value="Shortlisted">Status: Shortlisted</option>
                        <option value="Interviewing">Status: Interviewing</option>
                        <option value="Rejected">Status: Rejected</option>
                      </select>

                      {/* Delete */}
                      {deleteConfirmAppId === app._id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteApplication(app._id)}
                            className="py-1 px-2 rounded-lg bg-rose-600 text-white text-xs font-bold"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmAppId(null)}
                            className="py-1 px-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmAppId(app._id)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-rose-50 text-neutral-400 hover:text-rose-600 cursor-pointer"
                          title="Delete application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Resume Attached Block */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-neutral-950 truncate">
                          {app.resumeFileName || 'Candidate_Resume.pdf'}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          {app.resumeFileSize || (app.resumeUrl ? 'Cloud Document Link' : 'Document File')} • Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {(app.resumeFile || app.resumeUrl) ? (
                      <button
                        onClick={() => handleDownloadResume(app)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors shadow-xs"
                      >
                        {app.resumeFile ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                        <span>{app.resumeFile ? 'Download Resume' : 'Open Resume Link'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-neutral-400 italic">No resume attached</span>
                    )}
                  </div>

                  {/* Cover Note */}
                  {app.coverNote && (
                    <div className="p-3 rounded-xl bg-neutral-50/70 text-xs text-neutral-700 leading-relaxed border border-neutral-100">
                      <span className="font-bold text-neutral-900 block mb-0.5">Candidate Note:</span>
                      {app.coverNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}


      {/* JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingJob ? 'Edit Job Opening' : 'Add New Job Opening'}
              </h2>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Senior Full-Stack Engineer"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Department *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    placeholder="e.g. Engineering / Design / Cloud"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Job Type *</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Experience</label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. 3 - 6 Years"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Salary Band</label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g. ₹14L - ₹24L PA"
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Location</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="e.g. Chennai / Coimbatore / Remote"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Job Overview *</label>
                <textarea
                  required
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe the opportunity, team mission, and impact..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={jobForm.responsibilities}
                    onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                    Requirements (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1.5">Order</label>
                  <input
                    type="number"
                    value={jobForm.order}
                    onChange={(e) => setJobForm({ ...jobForm, order: e.target.value })}
                    className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="isActiveJob"
                    checked={jobForm.isActive}
                    onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-neutral-950 bg-neutral-100 border-neutral-300"
                  />
                  <label htmlFor="isActiveJob" className="text-sm font-medium text-neutral-800">
                    Accepting Applications
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingJob}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50"
                >
                  {savingJob ? 'Saving...' : editingJob ? 'Update Job' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PERK MODAL */}
      {isPerkModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-950">
                {editingPerk ? 'Edit Company Perk' : 'Add Company Perk'}
              </h2>
              <button
                onClick={() => setIsPerkModalOpen(false)}
                className="p-2 rounded-xl bg-neutral-100 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePerkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Perk Title *</label>
                <input
                  type="text"
                  required
                  value={perkForm.title}
                  onChange={(e) => setPerkForm({ ...perkForm, title: e.target.value })}
                  placeholder="e.g. Top-Tier Hardware"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1.5">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={perkForm.desc}
                  onChange={(e) => setPerkForm({ ...perkForm, desc: e.target.value })}
                  placeholder="Latest MacBook Pros, 4K external displays..."
                  className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-neutral-950 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsPerkModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPerk}
                  className="py-2.5 px-6 rounded-xl bg-black hover:bg-neutral-800 text-white text-sm font-bold disabled:opacity-50"
                >
                  {savingPerk ? 'Saving...' : editingPerk ? 'Update Perk' : 'Add Perk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareers;
