import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Send, Check } from 'lucide-react';
import { api } from '../services/api';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quick inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '₹50,000 - ₹1,00,000'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const res = await api.getServiceBySlug(slug);
        if (res.success && res.data) {
          setService(res.data);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Error loading service');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        ...formData,
        service: service?.title || 'Service Inquiry'
      });
      if (res.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <p className="text-neutral-600 mb-6">The requested service could not be located in our directory.</p>
        <Link to="/services" className="px-6 py-3 rounded-full bg-black text-white text-sm font-semibold">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Content & Sidebar */}
      <section className="pt-12 sm:pt-16 pb-24 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>All Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Header & Comprehensive Details */}
            <div className="lg:col-span-7 space-y-10">
              {/* Service Hero Header */}
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-500 block mb-3">
                  {service.tagline || 'Specialized Engineering'}
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-neutral-900 tracking-tight leading-[1.08] mb-6 font-sans-tight">
                  {service.title}
                </h1>
                <p className="text-neutral-700 text-lg sm:text-2xl leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {(service.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-white/80 border border-neutral-200 px-3.5 py-1.5 rounded-full text-black shadow-2xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview & Engineering Approach */}
              <div className="pt-8 border-t border-neutral-200/80">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                  Overview & Engineering Approach
                </h2>
                <p className="text-neutral-600 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>

              {/* Deliverables Section */}
              <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                  What You Receive (Deliverables)
                </h3>
                <div className="space-y-3">
                  {(service.deliverables || []).map((del, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-3 text-neutral-700 text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Advantages */}
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                    Key Advantages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-6 rounded-2xl bg-neutral-100/70 border border-neutral-200/60">
                        <h4 className="text-base font-bold text-neutral-900 mb-2">{feat.title}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service FAQs */}
              {service.faq && service.faq.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-neutral-400" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-4">
                    {service.faq.map((f, qIdx) => (
                      <div key={qIdx} className="p-6 rounded-2xl bg-white border border-neutral-200/80">
                        <h4 className="text-base font-bold text-neutral-900 mb-2">{f.question}</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Quick Proposal Inquiry Card */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <span className="text-xs uppercase font-mono tracking-widest text-amber-300 block mb-2">
                  Ready to Start?
                </span>
                <h3 className="text-2xl font-bold mb-2">
                  Request a Proposal for {service.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  Fill out your details below and our technical leads will review your requirements and provide an estimate within 24 hours.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Inquiry Received</h4>
                    <p className="text-xs text-neutral-300">
                      Thank you for contacting us! We will follow up via email at <span className="text-white">{formData.email}</span> shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Kumar"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-300"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. anand@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-300"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-300"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Estimated Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-800 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-300"
                      >
                        <option value="Under ₹50,000">Under ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                        <option value="₹2,50,000+">₹2,50,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Project Requirements</label>
                      <textarea
                        required
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project goals, deadlines, and technical specifications..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{submitting ? 'Sending Request...' : 'Send Inquiry'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
