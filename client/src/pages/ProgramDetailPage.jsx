import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Users, 
  Calendar, 
  Sparkles, 
  Send, 
  Check, 
  Layers, 
  HelpCircle,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { programsData } from '../data/programsData';
import { api } from '../services/api';

const ProgramDetailPage = () => {
  const { id } = useParams();
  
  // Find program by id or slug with API fetch and fallback
  const [program, setProgram] = useState(() => programsData.find((p) => p.id === id || p.slug === id || p._id === id) || null);

  useEffect(() => {
    const loadProg = async () => {
      try {
        const res = await api.getProgramById(id);
        if (res.success && res.data) {
          setProgram(res.data);
          return;
        }
      } catch (err) {
        // Continue to fallback
      }

      try {
        const allRes = await api.getPrograms();
        if (allRes.success && Array.isArray(allRes.data)) {
          const match = allRes.data.find((p) => p._id === id || p.slug === id || p.id === id);
          if (match) {
            setProgram(match);
            return;
          }
        }
      } catch (err) {
        // Continue to local data
      }

      const local = programsData.find((p) => p.id === id || p.slug === id || p._id === id);
      if (local) setProgram(local);
    };
    loadProg();
  }, [id]);

  // Inquiry modal / inline form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  if (!program) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-6">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold mb-3 text-neutral-900">Program Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md">
          The requested program details could not be found or may have been updated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-black transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Homepage
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: `Program: ${program.title}`,
        message: `Organization/Role: ${formData.organization} (${formData.role}) | Note: ${formData.message}`
      });
      if (res.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Program inquiry submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Other programs for discovery
  const otherPrograms = programsData.filter((p) => p.id !== program.id);

  return (
    <div className="bg-[#FBFBFA] min-h-screen pt-28 pb-24">
      {/* Top Breadcrumb & Return Link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-500">
          <Link to="/" className="hover:text-neutral-900 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <Link to="/programs" className="hover:text-neutral-900 transition-colors">
            Our Programs
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-xs">{program.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden border border-neutral-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {program.tag}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12] font-sans">
              {program.title}
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl mb-10">
              {program.subtitle}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" /> Duration
                </div>
                <div className="text-sm font-semibold text-white">{program.duration}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Calendar className="w-3.5 h-3.5" /> Format
                </div>
                <div className="text-sm font-semibold text-white truncate">{program.format}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <Users className="w-3.5 h-3.5" /> Target Audience
                </div>
                <div className="text-sm font-semibold text-white truncate">{program.targetAudience}</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Delivery Mode
                </div>
                <div className="text-sm font-semibold text-white truncate">{program.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (2 Columns) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Program Details & Curriculum */}
          <div className="lg:col-span-7 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-extrabold text-neutral-900 mb-4 tracking-tight font-sans">
                <span className="font-serif italic font-normal text-neutral-500 mr-2">Program</span>Overview
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
                {program.overview}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-sm">
              <h3 className="text-xl font-extrabold text-neutral-900 mb-6 flex items-center gap-2 font-sans">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span><span className="font-serif italic font-normal text-neutral-500 mr-2">Key</span>Pillars</span>
              </h3>
              <div className="space-y-4">
                {program.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-neutral-700 font-medium leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Roadmap */}
            <div>
              <div className="mb-6">
                <span className="text-xs font-serif italic text-neutral-500 block mb-1">
                  Syllabus &amp; Roadmap
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight font-sans">
                  <span className="font-serif italic font-normal text-neutral-500 mr-2">Curriculum &amp;</span>Milestones
                </h3>
              </div>

              <div className="space-y-4">
                {program.curriculum.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:border-neutral-400 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 text-xs font-bold tracking-wide">
                        {item.phase}
                      </span>
                      <span className="text-xs font-mono text-neutral-500 font-medium">
                        {item.weeks}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Outcomes */}
            <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
              <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2 font-sans">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span><span className="font-serif italic font-normal text-neutral-300 mr-2">Tangible</span>Outcomes</span>
              </h3>
              <div className="space-y-3.5">
                {program.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span className="text-sm text-neutral-200 font-normal leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200">
              <h3 className="text-lg font-extrabold text-neutral-900 mb-4 flex items-center gap-2 font-sans">
                <FileText className="w-5 h-5 text-neutral-700" />
                <span><span className="font-serif italic font-normal text-neutral-500 mr-2">Candidate</span>Eligibility</span>
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-600 list-disc list-inside">
                {program.eligibility.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* FAQs Accordion */}
            {program.faqs && program.faqs.length > 0 && (
              <div>
                <h3 className="text-2xl font-extrabold text-neutral-900 mb-6 flex items-center gap-2 font-sans">
                  <HelpCircle className="w-6 h-6 text-neutral-400" />
                  <span><span className="font-serif italic font-normal text-neutral-500 mr-2">Common</span>Questions</span>
                </h3>
                <div className="space-y-3">
                  {program.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-neutral-200 rounded-2xl bg-white overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-neutral-900 text-sm sm:text-base cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-neutral-400 transition-transform ${
                            activeFaq === idx ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      {activeFaq === idx && (
                        <div className="px-5 pb-5 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Application / Inquiry Sidebar Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white rounded-3xl p-8 border border-neutral-200/80 shadow-xl">
              <div className="mb-6">
                <span className="text-xs font-serif italic text-amber-700 block mb-1">
                  Admissions &amp; Onboarding
                </span>
                <h3 className="text-2xl font-extrabold text-neutral-900 font-sans">
                  <span className="font-serif italic font-normal text-neutral-500 mr-2">Apply for</span>Program
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Submit your details below to schedule an onboarding consultation or join the upcoming cohort.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">Application Received!</h4>
                  <p className="text-sm text-neutral-600 mb-6">
                    Thank you for applying. A program advisor from JAC MediaLand will reach out within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', organization: '', role: '', message: '' });
                    }}
                    className="text-xs font-semibold text-neutral-900 underline underline-offset-4"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Work / Academic Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Company / College
                      </label>
                      <input
                        type="text"
                        placeholder="Organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Designation / Year
                      </label>
                      <input
                        type="text"
                        placeholder="Role / Final Year"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Goals &amp; Requirements
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Tell us about your objectives, current tech stack, or cohort requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-neutral-50/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full bg-neutral-900 hover:bg-black text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-neutral-400 mt-2">
                    Guaranteed confidential. Protected under JAC MediaLand NDA.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explore Other Programs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="border-t border-neutral-200 pt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-serif italic text-neutral-500 block mb-1">
                Explore More
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-sans">
                <span className="font-serif italic font-normal text-neutral-500 mr-2">Other</span>Specialized Programs
              </h3>
            </div>
            <Link
              to="/programs"
              className="text-xs font-semibold text-neutral-900 hover:text-amber-600 transition-colors flex items-center gap-1"
            >
              View All Programs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPrograms.map((p) => (
              <Link
                key={p.id}
                to={`/programs/${p.id}`}
                className="group p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-neutral-900 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-2">
                    {p.tag}
                  </span>
                  <h4 className="text-lg font-bold text-neutral-900 group-hover:text-amber-700 transition-colors mb-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                    {p.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-semibold text-neutral-900">
                  <span>{p.duration}</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-amber-700">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetailPage;
